import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAccountsListAllParams = {
  headers?: Record<string, string>;
};

export type ChatwootAccountsCreateBody = Record<string, unknown>;

export type ChatwootAccountsCreateParams = {
  body: ChatwootAccountsCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAccountsGetParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootAccountsUpdateBody = Record<string, unknown>;

export type ChatwootAccountsUpdateParams = {
  accountId: number;
  body: ChatwootAccountsUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootAccountsDeleteParams = {
  accountId: number;
  headers?: Record<string, string>;
};

/**
 * Platform API resource for Accounts.
 */
export default class AccountsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List all accounts.
   *
   * Chatwoot API: GET /platform/api/v1/accounts
   */
  async listAll(params: ChatwootAccountsListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: '/platform/api/v1/accounts',
      headers: params.headers,
      resource: 'accounts',
      operation: 'listAll',
    });
  }

  /**
   * Create an account.
   *
   * Chatwoot API: POST /platform/api/v1/accounts
   */
  async create(params: ChatwootAccountsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: '/platform/api/v1/accounts',
      headers: params.headers,
      body: params.body,
      resource: 'accounts',
      operation: 'create',
    });
  }

  /**
   * Get account details.
   *
   * Chatwoot API: GET /platform/api/v1/accounts/{id}
   */
  async get(params: ChatwootAccountsGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/platform/api/v1/accounts/${params.accountId}`,
      headers: params.headers,
      resource: 'accounts',
      operation: 'get',
    });
  }

  /**
   * Update account.
   *
   * Chatwoot API: PATCH /platform/api/v1/accounts/{id}
   */
  async update(params: ChatwootAccountsUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/platform/api/v1/accounts/${params.accountId}`,
      headers: params.headers,
      body: params.body,
      resource: 'accounts',
      operation: 'update',
    });
  }

  /**
   * Delete account.
   *
   * Chatwoot API: DELETE /platform/api/v1/accounts/{id}
   */
  async delete(params: ChatwootAccountsDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/platform/api/v1/accounts/${params.accountId}`,
      headers: params.headers,
      resource: 'accounts',
      operation: 'delete',
    });
  }
}
