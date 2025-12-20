import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAccountAgentBotsListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootAccountAgentBotsCreateBody = {
  name: string;
  description?: string;
  outgoing_url: string;
  avatar?: string;
  avatar_url?: string;
  bot_type?: number;
  bot_config?: Record<string, unknown>;
};

export type ChatwootAccountAgentBotsCreateParams = {
  accountId: number;
  body: ChatwootAccountAgentBotsCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAccountAgentBotsGetParams = {
  accountId: number;
  agentBotId: number;
  headers?: Record<string, string>;
};

export type ChatwootAccountAgentBotsUpdateBody =
  Partial<ChatwootAccountAgentBotsCreateBody>;

export type ChatwootAccountAgentBotsUpdateParams = {
  accountId: number;
  agentBotId: number;
  body: ChatwootAccountAgentBotsUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootAccountAgentBotsDeleteParams = {
  accountId: number;
  agentBotId: number;
  headers?: Record<string, string>;
};

export default class AccountAgentBotsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List all agent bots available for the current account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/agent_bots
   */
  async listAll(
    params: ChatwootAccountAgentBotsListAllParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/agent_bots`,
      headers: params.headers,
      resource: 'accountAgentBots',
      operation: 'listAll',
    });
  }

  /**
   * Create an agent bot in the account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/agent_bots
   */
  async create(params: ChatwootAccountAgentBotsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/agent_bots`,
      headers: params.headers,
      body: params.body,
      resource: 'accountAgentBots',
      operation: 'create',
    });
  }

  /**
   * Get the details of an agent bot in the account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/agent_bots/{id}
   */
  async get(params: ChatwootAccountAgentBotsGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      resource: 'accountAgentBots',
      operation: 'get',
    });
  }

  /**
   * Update an agent bots attributes.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/agent_bots/{id}
   */
  async update(params: ChatwootAccountAgentBotsUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      body: params.body,
      resource: 'accountAgentBots',
      operation: 'update',
    });
  }

  /**
   * Delete an AgentBot from the account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/agent_bots/{id}
   */
  async delete(params: ChatwootAccountAgentBotsDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      resource: 'accountAgentBots',
      operation: 'delete',
    });
  }
}
