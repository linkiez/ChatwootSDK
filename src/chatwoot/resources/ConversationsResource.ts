import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootConversationsListByContactParams = {
  accountId: number;
  contactId: number;
  headers?: Record<string, string>;
};

export type ChatwootConversationCreateBody = {
  inbox_id: number;
  contact_id: number;
  source_id?: string;
};

export type ChatwootConversationsCreateParams = {
  accountId: number;
  body: ChatwootConversationCreateBody;
  headers?: Record<string, string>;
};

/**
 * Chatwoot Conversations API wrapper.
 */
export default class ConversationsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists conversations for a contact.
   *
   * @param params - List parameters
   * @returns Chatwoot API response payload
   */
  async listByContact(
    params: ChatwootConversationsListByContactParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/contacts/${params.contactId}/conversations`,
      headers: params.headers,
      resource: 'conversations',
      operation: 'listByContact',
    });
  }

  /**
   * Creates a new conversation.
   *
   * @param params - Create parameters
   * @returns Chatwoot API response payload
   */
  async create(params: ChatwootConversationsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/conversations`,
      headers: params.headers,
      body: params.body,
      resource: 'conversations',
      operation: 'create',
    });
  }
}
