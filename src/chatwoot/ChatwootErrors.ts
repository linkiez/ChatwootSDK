export type ChatwootErrorContext = {
  statusCode?: number;
  resource?: string;
  operation?: string;
  requestId?: string;
  responseBody?: unknown;
};

export class ChatwootError extends Error {
  public readonly statusCode?: number;

  public readonly resource?: string;

  public readonly operation?: string;

  public readonly requestId?: string;

  public readonly responseBody?: unknown;

  constructor(message: string, context: ChatwootErrorContext = {}) {
    super(message);

    this.name = 'ChatwootError';
    this.statusCode = context.statusCode;
    this.resource = context.resource;
    this.operation = context.operation;
    this.requestId = context.requestId;
    this.responseBody = context.responseBody;
  }
}

export class ChatwootAuthError extends ChatwootError {
  constructor(
    message = 'Chatwoot authentication failed',
    context: ChatwootErrorContext = {},
  ) {
    super(message, context);
    this.name = 'ChatwootAuthError';
  }
}

export class ChatwootNotFoundError extends ChatwootError {
  constructor(
    message = 'Chatwoot resource not found',
    context: ChatwootErrorContext = {},
  ) {
    super(message, context);
    this.name = 'ChatwootNotFoundError';
  }
}

export class ChatwootRateLimitError extends ChatwootError {
  public readonly retryAfterMs?: number;

  constructor(
    message = 'Chatwoot rate limit exceeded',
    context: ChatwootErrorContext = {},
    retryAfterMs?: number,
  ) {
    super(message, context);
    this.name = 'ChatwootRateLimitError';
    this.retryAfterMs = retryAfterMs;
  }
}

export class ChatwootValidationError extends ChatwootError {
  constructor(
    message = 'Chatwoot validation failed',
    context: ChatwootErrorContext = {},
  ) {
    super(message, context);
    this.name = 'ChatwootValidationError';
  }
}

export class ChatwootUnexpectedError extends ChatwootError {
  constructor(
    message = 'Chatwoot unexpected error',
    context: ChatwootErrorContext = {},
  ) {
    super(message, context);
    this.name = 'ChatwootUnexpectedError';
  }
}

export class ChatwootTimeoutError extends ChatwootError {
  constructor(
    message = 'Chatwoot request timed out',
    context: ChatwootErrorContext = {},
  ) {
    super(message, context);
    this.name = 'ChatwootTimeoutError';
  }
}
