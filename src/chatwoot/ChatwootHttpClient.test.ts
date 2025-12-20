import { ChatwootTimeoutError } from '@integrations/message/providers/chatwoot/ChatwootErrors';
import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

describe('ChatwootHttpClient', () => {
  it('should build absolute URL from baseUrl + path', () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest.fn(
      async (
        _url: string,
        _init?: Parameters<ChatwootFetchLike>[1],
      ): Promise<ChatwootFetchResponse> => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true }),
          headers: {
            get: () => null,
          },
        };
      },
    );

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test/',
      apiAccessToken: 'token-123',
      fetchImpl,
    });

    expect(client.buildUrl('/survey/responses/123')).toBe(
      'https://example.chatwoot.test/survey/responses/123',
    );
  });

  it('should build URL and inject api_access_token header', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest.fn(
      async (
        _url: string,
        _init?: Parameters<ChatwootFetchLike>[1],
      ): Promise<ChatwootFetchResponse> => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true }),
          headers: {
            get: () => null,
          },
        };
      },
    );

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test',
      apiAccessToken: 'token-123',
      fetchImpl,
    });

    await client.requestJson({
      path: '/api/v1/accounts/1/contacts',
      resource: 'contacts',
      operation: 'list',
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://example.chatwoot.test/api/v1/accounts/1/contacts',
    );
    expect(init?.headers?.api_access_token).toBe('token-123');
  });

  it('should JSON stringify body and set Content-Type', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest.fn(
      async (
        _url: string,
        _init?: Parameters<ChatwootFetchLike>[1],
      ): Promise<ChatwootFetchResponse> => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true }),
          headers: {
            get: () => null,
          },
        };
      },
    );

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test/',
      apiAccessToken: 'token-123',
      fetchImpl,
    });

    await client.requestJson({
      method: 'POST',
      path: 'api/v1/accounts/1/contacts',
      resource: 'contacts',
      operation: 'create',
      body: { name: 'John' },
    });

    const [, init] = fetchImpl.mock.calls[0];
    expect(init?.headers?.['Content-Type']).toBe('application/json');
    expect(init?.body).toBe(JSON.stringify({ name: 'John' }));
  });

  it('should retry on 429 using Retry-After header', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest
      .fn<ReturnType<ChatwootFetchLike>, Parameters<ChatwootFetchLike>>()
      .mockImplementationOnce(async () => {
        return {
          ok: false,
          status: 429,
          json: async () => ({ error: 'rate limited' }),
          headers: {
            get: (name: string) => {
              if (name.toLowerCase() === 'retry-after') {
                return '0.001';
              }
              return null;
            },
          },
        };
      })
      .mockImplementationOnce(async () => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true }),
          headers: {
            get: () => null,
          },
        };
      });

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test',
      apiAccessToken: 'token-123',
      fetchImpl,
      retry: {
        maxRetries: 2,
        jitterRatio: 0,
      },
    });

    const requestPromise = client.requestJson({
      path: '/api/v1/accounts/1/contacts',
      resource: 'contacts',
      operation: 'list',
    });

    await requestPromise;
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('should retry on 5xx using exponential backoff', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest
      .fn<ReturnType<ChatwootFetchLike>, Parameters<ChatwootFetchLike>>()
      .mockImplementationOnce(async () => {
        return {
          ok: false,
          status: 500,
          json: async () => ({ error: 'server error' }),
          headers: {
            get: () => null,
          },
        };
      })
      .mockImplementationOnce(async () => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true }),
          headers: {
            get: () => null,
          },
        };
      });

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test',
      apiAccessToken: 'token-123',
      fetchImpl,
      retry: {
        maxRetries: 2,
        baseDelayMs: 1,
        jitterRatio: 0,
      },
    });

    const requestPromise = client.requestJson({
      path: '/api/v1/accounts/1/contacts',
      resource: 'contacts',
      operation: 'list',
    });

    await requestPromise;
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('should throw ChatwootTimeoutError on timeout', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest.fn(
      async (_url: string, init?: Parameters<ChatwootFetchLike>[1]) => {
        return await new Promise<ChatwootFetchResponse>((_resolve, reject) => {
          const signal = init?.signal;
          if (signal?.aborted) {
            const error = new Error('AbortError');
            (error as unknown as { name: string }).name = 'AbortError';
            reject(error);
            return;
          }

          signal?.addEventListener('abort', () => {
            const error = new Error('AbortError');
            (error as unknown as { name: string }).name = 'AbortError';
            reject(error);
          });
        });
      },
    );

    const client = new ChatwootHttpClient({
      baseUrl: 'https://example.chatwoot.test',
      apiAccessToken: 'token-123',
      timeoutMs: 1,
      fetchImpl,
      retry: {
        maxRetries: 0,
      },
    });

    const requestPromise = client.requestJson({
      path: '/api/v1/accounts/1/contacts',
      resource: 'contacts',
      operation: 'list',
    });

    await expect(requestPromise).rejects.toBeInstanceOf(ChatwootTimeoutError);
  });
});
