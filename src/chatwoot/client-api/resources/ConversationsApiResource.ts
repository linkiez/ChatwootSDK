import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootConversationsApiListConversationsParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  headers?: Record<string, string>;
};

export type ChatwootConversationsApiCreateConversationParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  headers?: Record<string, string>;
};

export default class ConversationsApiResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Get conversations.
   *
   * Chatwoot API: GET /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations
   */
  async listConversations(
    params: ChatwootConversationsApiListConversationsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}/conversations`,
      headers: params.headers,
      resource: 'conversationsApi',
      operation: 'listConversations',
    });
  }

  /**
   * Create a conversation.
   *
   * Chatwoot API: POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations
   */
  async createConversation(
    params: ChatwootConversationsApiCreateConversationParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}/conversations`,
      headers: params.headers,
      resource: 'conversationsApi',
      operation: 'createConversation',
    });
  }
}
