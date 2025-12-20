import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAccountUsersListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootAccountUsersCreateBody = {
  user_id: number;
  role: string;
  [key: string]: unknown;
};

export type ChatwootAccountUsersCreateParams = {
  accountId: number;
  body: ChatwootAccountUsersCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAccountUsersDeleteParams = {
  accountId: number;
  headers?: Record<string, string>;
};

/**
 * Platform API resource for Account Users.
 */
export default class AccountUsersResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List all account users.
   *
   * Chatwoot API: GET /platform/api/v1/accounts/{account_id}/account_users
   */
  async listAll(params: ChatwootAccountUsersListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/platform/api/v1/accounts/${params.accountId}/account_users`,
      headers: params.headers,
      resource: 'accountUsers',
      operation: 'listAll',
    });
  }

  /**
   * Create an account user.
   *
   * Chatwoot API: POST /platform/api/v1/accounts/{account_id}/account_users
   */
  async create(params: ChatwootAccountUsersCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/platform/api/v1/accounts/${params.accountId}/account_users`,
      headers: params.headers,
      body: params.body,
      resource: 'accountUsers',
      operation: 'create',
    });
  }

  /**
   * Delete an account user.
   *
   * Chatwoot API: DELETE /platform/api/v1/accounts/{account_id}/account_users
   */
  async delete(params: ChatwootAccountUsersDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/platform/api/v1/accounts/${params.accountId}/account_users`,
      headers: params.headers,
      resource: 'accountUsers',
      operation: 'delete',
    });
  }
}
