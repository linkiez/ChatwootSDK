import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootCannedResponsesListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootCannedResponsesCreateBody = {
  content: string;
  short_code: string;
};

export type ChatwootCannedResponsesCreateParams = {
  accountId: number;
  body: ChatwootCannedResponsesCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootCannedResponsesUpdateBody = {
  content?: string;
  short_code?: string;
};

export type ChatwootCannedResponsesUpdateParams = {
  accountId: number;
  cannedResponseId: number;
  body: ChatwootCannedResponsesUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootCannedResponsesDeleteParams = {
  accountId: number;
  cannedResponseId: number;
  headers?: Record<string, string>;
};

export default class CannedResponsesResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all canned responses in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/canned_responses
   */
  async listAll(
    params: ChatwootCannedResponsesListAllParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/canned_responses`,
      headers: params.headers,
      resource: 'cannedResponses',
      operation: 'listAll',
    });
  }

  /**
   * Adds a new canned response to an account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/canned_responses
   */
  async create(params: ChatwootCannedResponsesCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/canned_responses`,
      headers: params.headers,
      body: params.body,
      resource: 'cannedResponses',
      operation: 'create',
    });
  }

  /**
   * Updates a canned response in an account.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/canned_responses/{id}
   */
  async update(params: ChatwootCannedResponsesUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/canned_responses/${params.cannedResponseId}`,
      headers: params.headers,
      body: params.body,
      resource: 'cannedResponses',
      operation: 'update',
    });
  }

  /**
   * Removes a canned response from an account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/canned_responses/{id}
   */
  async delete(params: ChatwootCannedResponsesDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/canned_responses/${params.cannedResponseId}`,
      headers: params.headers,
      resource: 'cannedResponses',
      operation: 'delete',
    });
  }
}
