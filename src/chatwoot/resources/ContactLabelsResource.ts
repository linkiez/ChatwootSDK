import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootContactLabelsListParams = {
  accountId: number;
  contactId: number;
  headers?: Record<string, string>;
};

export type ChatwootContactLabelsAddBody = {
  labels: string[];
};

export type ChatwootContactLabelsAddParams = {
  accountId: number;
  contactId: number;
  body: ChatwootContactLabelsAddBody;
  headers?: Record<string, string>;
};

export default class ContactLabelsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all the labels of a contact.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/contacts/{id}/labels
   */
  async listLabels(params: ChatwootContactLabelsListParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/contacts/${params.contactId}/labels`,
      headers: params.headers,
      resource: 'contactLabels',
      operation: 'listLabels',
    });
  }

  /**
   * Add labels to a contact.
   *
   * Note: This API overwrites the existing list of labels.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/contacts/{id}/labels
   */
  async addLabels(params: ChatwootContactLabelsAddParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/contacts/${params.contactId}/labels`,
      headers: params.headers,
      body: params.body,
      resource: 'contactLabels',
      operation: 'addLabels',
    });
  }
}
