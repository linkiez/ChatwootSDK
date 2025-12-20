import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAccountGetParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootAccountUpdateBody = {
  name?: string;
  domain?: string;
  support_email?: string;
  locale?: string;
};

export type ChatwootAccountUpdateParams = {
  accountId: number;
  body: ChatwootAccountUpdateBody;
  headers?: Record<string, string>;
};

export default class AccountResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Fetches account details.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}
   */
  async get(params: ChatwootAccountGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}`,
      headers: params.headers,
      resource: 'account',
      operation: 'get',
    });
  }

  /**
   * Updates account settings.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}
   */
  async update(params: ChatwootAccountUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}`,
      headers: params.headers,
      body: params.body,
      resource: 'account',
      operation: 'update',
    });
  }
}
