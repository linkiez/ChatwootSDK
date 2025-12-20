import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootConversationAssignmentsAssignBody = {
  assignee_id?: number;
  team_id?: number;
};

export type ChatwootConversationAssignmentsAssignParams = {
  accountId: number;
  conversationId: number;
  body: ChatwootConversationAssignmentsAssignBody;
  headers?: Record<string, string>;
};

export default class ConversationAssignmentsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Assign a conversation to an agent or a team.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/assignments
   */
  async assign(
    params: ChatwootConversationAssignmentsAssignParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/conversations/${params.conversationId}/assignments`,
      headers: params.headers,
      body: params.body,
      resource: 'conversationAssignments',
      operation: 'assign',
    });
  }
}
