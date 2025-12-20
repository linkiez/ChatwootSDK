import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootWebhooksListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootWebhookSubscription =
  | 'conversation_created'
  | 'conversation_status_changed'
  | 'conversation_updated'
  | 'message_created'
  | 'message_updated'
  | 'contact_created'
  | 'contact_updated'
  | 'webwidget_triggered';

export type ChatwootWebhookUpsertBody = {
  url: string;
  name?: string;
  subscriptions: ChatwootWebhookSubscription[];
};

export type ChatwootWebhooksCreateParams = {
  accountId: number;
  body: ChatwootWebhookUpsertBody;
  headers?: Record<string, string>;
};

export type ChatwootWebhooksUpdateParams = {
  accountId: number;
  webhookId: number;
  body: ChatwootWebhookUpsertBody;
  headers?: Record<string, string>;
};

export type ChatwootWebhooksDeleteParams = {
  accountId: number;
  webhookId: number;
  headers?: Record<string, string>;
};

export default class WebhooksResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all webhooks in the account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/webhooks
   */
  async listAll(params: ChatwootWebhooksListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/webhooks`,
      headers: params.headers,
      resource: 'webhooks',
      operation: 'listAll',
    });
  }

  /**
   * Adds a webhook subscription to the account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/webhooks
   */
  async create(params: ChatwootWebhooksCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/webhooks`,
      headers: params.headers,
      body: params.body,
      resource: 'webhooks',
      operation: 'create',
    });
  }

  /**
   * Updates a webhook object in the account.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/webhooks/{webhook_id}
   */
  async update(params: ChatwootWebhooksUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/webhooks/${params.webhookId}`,
      headers: params.headers,
      body: params.body,
      resource: 'webhooks',
      operation: 'update',
    });
  }

  /**
   * Deletes a webhook from the account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/webhooks/{webhook_id}
   */
  async delete(params: ChatwootWebhooksDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/webhooks/${params.webhookId}`,
      headers: params.headers,
      resource: 'webhooks',
      operation: 'delete',
    });
  }
}
