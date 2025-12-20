import {
  ChatwootAuthError,
  ChatwootError,
  ChatwootNotFoundError,
  ChatwootRateLimitError,
  ChatwootTimeoutError,
  ChatwootUnexpectedError,
  ChatwootValidationError,
} from '@integrations/message/providers/chatwoot/ChatwootErrors';

export type ChatwootFetchResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text?: () => Promise<string>;
  headers?: {
    get(name: string): string | null;
  };
};

export type ChatwootFetchLike = (
  url: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
  },
) => Promise<ChatwootFetchResponse>;

export type ChatwootHttpClientOptions = {
  baseUrl: string;
  apiAccessToken?: string;
  timeoutMs?: number;
  fetchImpl?: ChatwootFetchLike;
  retry?: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    jitterRatio?: number;
  };
};

type RequestJsonOptions = {
  method?: string;
  path: string;
  headers?: Record<string, string>;
  body?: unknown;
  resource?: string;
  operation?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function getRequestId(response: ChatwootFetchResponse): string | undefined {
  const headerValue =
    response.headers?.get('x-request-id') ??
    response.headers?.get('X-Request-Id');
  return isNonEmptyString(headerValue) ? headerValue : undefined;
}

function parseRetryAfterMs(
  response: ChatwootFetchResponse,
): number | undefined {
  const retryAfter =
    response.headers?.get('retry-after') ??
    response.headers?.get('Retry-After');
  if (!isNonEmptyString(retryAfter)) {
    return undefined;
  }

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds > 0) {
    return seconds * 1000;
  }

  return undefined;
}

type ResolvedRetryOptions = {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterRatio: number;
};

const DEFAULT_RETRY_OPTIONS: ResolvedRetryOptions = {
  maxRetries: 2,
  baseDelayMs: 250,
  maxDelayMs: 5_000,
  jitterRatio: 0.2,
};

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function resolveRetryOptions(
  retry?: ChatwootHttpClientOptions['retry'],
): ResolvedRetryOptions {
  const maxRetries =
    typeof retry?.maxRetries === 'number' && retry.maxRetries >= 0
      ? retry.maxRetries
      : DEFAULT_RETRY_OPTIONS.maxRetries;

  const baseDelayMs =
    typeof retry?.baseDelayMs === 'number' && retry.baseDelayMs > 0
      ? retry.baseDelayMs
      : DEFAULT_RETRY_OPTIONS.baseDelayMs;

  const maxDelayMs =
    typeof retry?.maxDelayMs === 'number' && retry.maxDelayMs > 0
      ? retry.maxDelayMs
      : DEFAULT_RETRY_OPTIONS.maxDelayMs;

  const jitterRatio =
    typeof retry?.jitterRatio === 'number' && retry.jitterRatio >= 0
      ? retry.jitterRatio
      : DEFAULT_RETRY_OPTIONS.jitterRatio;

  return {
    maxRetries,
    baseDelayMs,
    maxDelayMs,
    jitterRatio: clampNumber(jitterRatio, 0, 1),
  };
}

function computeBackoffMs(
  attempt: number,
  options: ResolvedRetryOptions,
): number {
  const raw = options.baseDelayMs * Math.pow(2, attempt);
  const capped = Math.min(raw, options.maxDelayMs);

  if (options.jitterRatio <= 0) {
    return capped;
  }

  const jitter = (Math.random() * 2 - 1) * options.jitterRatio;
  return Math.max(0, Math.round(capped * (1 + jitter)));
}

async function sleepMs(ms: number): Promise<void> {
  if (!(ms > 0)) {
    return;
  }

  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isAbortError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeName = (error as { name?: unknown }).name;
  return maybeName === 'AbortError';
}

export default class ChatwootHttpClient {
  private readonly baseUrl: string;

  private readonly apiAccessToken?: string;

  private readonly timeoutMs: number;

  private readonly fetchImpl: ChatwootFetchLike;

  private readonly retryOptions: ResolvedRetryOptions;

  constructor(options: ChatwootHttpClientOptions) {
    if (!isNonEmptyString(options?.baseUrl)) {
      throw new ChatwootValidationError('Chatwoot baseUrl is required');
    }

    this.baseUrl = String(options.baseUrl);
    this.apiAccessToken = isNonEmptyString(options.apiAccessToken)
      ? String(options.apiAccessToken)
      : undefined;

    this.timeoutMs =
      typeof options.timeoutMs === 'number' && options.timeoutMs > 0
        ? options.timeoutMs
        : 30_000;

    this.retryOptions = resolveRetryOptions(options.retry);

    const defaultFetch = (
      globalThis as unknown as { fetch?: ChatwootFetchLike }
    ).fetch;
    if (!options.fetchImpl && !defaultFetch) {
      throw new ChatwootValidationError(
        'No fetch implementation available for ChatwootHttpClient',
      );
    }

    this.fetchImpl = options.fetchImpl ?? (defaultFetch as ChatwootFetchLike);
  }

  buildUrl(path: string): string {
    return joinUrl(this.baseUrl, path);
  }

  async requestJson<TResponse>(
    options: RequestJsonOptions,
  ): Promise<TResponse> {
    const url = joinUrl(this.baseUrl, options.path);

    const headers: Record<string, string> = {
      ...(this.apiAccessToken ? { api_access_token: this.apiAccessToken } : {}),
      ...(options.headers ?? {}),
    };

    const hasBody = options.body !== undefined;
    if (hasBody) {
      headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';
    }

    const init = {
      method: options.method ?? 'GET',
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    };

    let attempt = 0;
    // attempt = number of retries already performed.
    while (true) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, this.timeoutMs);

      let response: ChatwootFetchResponse;
      try {
        response = await this.fetchImpl(url, {
          ...init,
          signal: controller.signal,
        });
      } catch (error) {
        clearTimeout(timeoutId);

        if (isAbortError(error)) {
          throw new ChatwootTimeoutError('Chatwoot request timed out', {
            resource: options.resource,
            operation: options.operation,
          });
        }

        throw new ChatwootUnexpectedError('Chatwoot request failed', {
          resource: options.resource,
          operation: options.operation,
          responseBody: error,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const requestId = getRequestId(response);

      let responseBody: unknown;
      try {
        responseBody = await response.json();
      } catch {
        if (response.text) {
          try {
            responseBody = await response.text();
          } catch {
            responseBody = undefined;
          }
        }
      }

      if (response.ok) {
        return responseBody as TResponse;
      }

      const context = {
        statusCode: response.status,
        resource: options.resource,
        operation: options.operation,
        requestId,
        responseBody,
      };

      if (response.status === 401 || response.status === 403) {
        throw new ChatwootAuthError(
          'Chatwoot authentication/authorization failed',
          context,
        );
      }

      if (response.status === 404) {
        throw new ChatwootNotFoundError('Chatwoot resource not found', context);
      }

      if (response.status === 429) {
        const retryAfterMs = parseRetryAfterMs(response);

        if (attempt < this.retryOptions.maxRetries) {
          const delayMs =
            retryAfterMs ?? computeBackoffMs(attempt, this.retryOptions);
          attempt += 1;
          await sleepMs(delayMs);
          continue;
        }

        throw new ChatwootRateLimitError(
          'Chatwoot rate limit exceeded',
          context,
          retryAfterMs,
        );
      }

      if (response.status >= 400 && response.status < 500) {
        throw new ChatwootValidationError('Chatwoot request failed', context);
      }

      if (response.status >= 500) {
        if (attempt < this.retryOptions.maxRetries) {
          const delayMs = computeBackoffMs(attempt, this.retryOptions);
          attempt += 1;
          await sleepMs(delayMs);
          continue;
        }

        throw new ChatwootUnexpectedError('Chatwoot server error', context);
      }

      throw new ChatwootError('Chatwoot request failed', context);
    }
  }
}
