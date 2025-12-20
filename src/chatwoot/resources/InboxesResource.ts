import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootInboxesListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootInboxesGetParams = {
  accountId: number;
  inboxId: number;
  headers?: Record<string, string>;
};

export type ChatwootInboxesChannel = Record<string, unknown>;

export type ChatwootInboxesCreateBody = {
  name: string;
  channel: ChatwootInboxesChannel;
  avatar?: string;
  greeting_enabled?: boolean;
  greeting_message?: string;
  enable_email_collect?: boolean;
  csat_survey_enabled?: boolean;
  enable_auto_assignment?: boolean;
  working_hours_enabled?: boolean;
  out_of_office_message?: string;
  timezone?: string;
  allow_messages_after_resolved?: boolean;
  lock_to_single_conversation?: boolean;
  portal_id?: number;
  sender_name_type?: 'friendly' | 'professional' | (string & {});
  business_name?: string;
};

export type ChatwootInboxesCreateParams = {
  accountId: number;
  body: ChatwootInboxesCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootInboxesUpdateBody = Partial<ChatwootInboxesCreateBody>;

export type ChatwootInboxesUpdateParams = {
  accountId: number;
  inboxId: number;
  body: ChatwootInboxesUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootInboxesShowAgentBotParams = {
  accountId: number;
  inboxId: number;
  headers?: Record<string, string>;
};

export type ChatwootInboxesSetAgentBotBody = {
  agent_bot: number | null;
};

export type ChatwootInboxesSetAgentBotParams = {
  accountId: number;
  inboxId: number;
  body: ChatwootInboxesSetAgentBotBody;
  headers?: Record<string, string>;
};

export type ChatwootInboxesListAgentsParams = {
  accountId: number;
  inboxId: number;
  headers?: Record<string, string>;
};

export type ChatwootInboxesInboxMembersBody = {
  inbox_id: number;
  user_ids: number[];
};

export type ChatwootInboxesAddAgentsParams = {
  accountId: number;
  body: ChatwootInboxesInboxMembersBody;
  headers?: Record<string, string>;
};

export type ChatwootInboxesRemoveAgentsParams = {
  accountId: number;
  body: ChatwootInboxesInboxMembersBody;
  headers?: Record<string, string>;
};

export type ChatwootInboxesUpdateAgentsParams = {
  accountId: number;
  body: ChatwootInboxesInboxMembersBody;
  headers?: Record<string, string>;
};

export default class InboxesResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List all inboxes available in the current account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/inboxes
   */
  async listAll(params: ChatwootInboxesListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/inboxes`,
      headers: params.headers,
      resource: 'inboxes',
      operation: 'listAll',
    });
  }

  /**
   * Get an inbox available in the current account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/inboxes/{id}
   */
  async get(params: ChatwootInboxesGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/inboxes/${params.inboxId}`,
      headers: params.headers,
      resource: 'inboxes',
      operation: 'get',
    });
  }

  /**
   * Create an inbox.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/inboxes
   */
  async create(params: ChatwootInboxesCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/inboxes`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'create',
    });
  }

  /**
   * Update an existing inbox.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/inboxes/{id}
   */
  async update(params: ChatwootInboxesUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/inboxes/${params.inboxId}`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'update',
    });
  }

  /**
   * See if an agent bot is associated to the inbox.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/inboxes/{id}/agent_bot
   */
  async showAgentBot(
    params: ChatwootInboxesShowAgentBotParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/inboxes/${params.inboxId}/agent_bot`,
      headers: params.headers,
      resource: 'inboxes',
      operation: 'showAgentBot',
    });
  }

  /**
   * Add or remove agent bot.
   *
   * To add an agent bot pass agent_bot id, to remove agent bot from an inbox pass null.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/inboxes/{id}/set_agent_bot
   */
  async setAgentBot(
    params: ChatwootInboxesSetAgentBotParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/inboxes/${params.inboxId}/set_agent_bot`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'setAgentBot',
    });
  }

  /**
   * Get details of agents in an inbox.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/inbox_members/{inbox_id}
   */
  async listAgents(params: ChatwootInboxesListAgentsParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/inbox_members/${params.inboxId}`,
      headers: params.headers,
      resource: 'inboxes',
      operation: 'listAgents',
    });
  }

  /**
   * Add a new agent to inbox.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/inbox_members
   */
  async addAgents(params: ChatwootInboxesAddAgentsParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/inbox_members`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'addAgents',
    });
  }

  /**
   * Remove an agent from inbox.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/inbox_members
   */
  async removeAgents(
    params: ChatwootInboxesRemoveAgentsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/inbox_members`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'removeAgents',
    });
  }

  /**
   * Update agents in inbox.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/inbox_members
   */
  async updateAgents(
    params: ChatwootInboxesUpdateAgentsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/inbox_members`,
      headers: params.headers,
      body: params.body,
      resource: 'inboxes',
      operation: 'updateAgents',
    });
  }
}
