import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootMessagesApiListMessagesParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  conversationId: number;
  headers?: Record<string, string>;
};

export type ChatwootMessagesApiCreateMessageBody = Record<string, unknown>;

export type ChatwootMessagesApiCreateMessageParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  conversationId: number;
  body: ChatwootMessagesApiCreateMessageBody;
  headers?: Record<string, string>;
};

/**
 * Client API resource for Messages.
 */
export default class MessagesApiResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List messages in a conversation.
   *
   * Chatwoot API: GET /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations/{conversation_id}/messages
   */
  async listMessages(
    params: ChatwootMessagesApiListMessagesParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}/conversations/${params.conversationId}/messages`,
      headers: params.headers,
      resource: 'messagesApi',
      operation: 'listMessages',
    });
  }

  /**
   * Create a message in a conversation.
   *
   * Chatwoot API: POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations/{conversation_id}/messages
   */
  async createMessage(
    params: ChatwootMessagesApiCreateMessageParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}/conversations/${params.conversationId}/messages`,
      headers: params.headers,
      body: params.body,
      resource: 'messagesApi',
      operation: 'createMessage',
    });
  }
}
