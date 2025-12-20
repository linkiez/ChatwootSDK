import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootMessageCreateBody = {
  content: string;
  message_type: 'outgoing' | 'incoming';
  private: boolean;
  content_type: 'text' | string;
};

export type ChatwootMessagesCreateParams = {
  accountId: number;
  conversationId: number;
  body: ChatwootMessageCreateBody;
  headers?: Record<string, string>;
};

/**
 * Chatwoot Messages API wrapper.
 */
export default class MessagesResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Sends a message to a conversation.
   *
   * @param params - Message parameters
   * @returns Chatwoot API response payload
   */
  async create(params: ChatwootMessagesCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/conversations/${params.conversationId}/messages`,
      headers: params.headers,
      body: params.body,
      resource: 'messages',
      operation: 'create',
    });
  }
}
