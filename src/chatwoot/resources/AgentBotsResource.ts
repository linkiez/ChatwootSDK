import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAgentBotsListAllParams = {
  headers?: Record<string, string>;
};

export type ChatwootAgentBotsCreateBody = {
  name: string;
  description?: string;
  outgoing_url: string;
  account_id?: number;
  avatar?: string;
  avatar_url?: string;
};

export type ChatwootAgentBotsCreateParams = {
  body: ChatwootAgentBotsCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAgentBotsGetParams = {
  agentBotId: number;
  headers?: Record<string, string>;
};

export type ChatwootAgentBotsUpdateBody = Partial<ChatwootAgentBotsCreateBody>;

export type ChatwootAgentBotsUpdateParams = {
  agentBotId: number;
  body: ChatwootAgentBotsUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootAgentBotsDeleteParams = {
  agentBotId: number;
  headers?: Record<string, string>;
};

export default class AgentBotsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List all agent bots available.
   *
   * Chatwoot API: GET /platform/api/v1/agent_bots
   */
  async listAll(params: ChatwootAgentBotsListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: '/platform/api/v1/agent_bots',
      headers: params.headers,
      resource: 'agentBots',
      operation: 'listAll',
    });
  }

  /**
   * Create an agent bot.
   *
   * Chatwoot API: POST /platform/api/v1/agent_bots
   */
  async create(params: ChatwootAgentBotsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: '/platform/api/v1/agent_bots',
      headers: params.headers,
      body: params.body,
      resource: 'agentBots',
      operation: 'create',
    });
  }

  /**
   * Get an agent bot details.
   *
   * Chatwoot API: GET /platform/api/v1/agent_bots/{id}
   */
  async get(params: ChatwootAgentBotsGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/platform/api/v1/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      resource: 'agentBots',
      operation: 'get',
    });
  }

  /**
   * Update an agent bots attributes.
   *
   * Chatwoot API: PATCH /platform/api/v1/agent_bots/{id}
   */
  async update(params: ChatwootAgentBotsUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/platform/api/v1/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      body: params.body,
      resource: 'agentBots',
      operation: 'update',
    });
  }

  /**
   * Delete an AgentBot.
   *
   * Chatwoot API: DELETE /platform/api/v1/agent_bots/{id}
   */
  async delete(params: ChatwootAgentBotsDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/platform/api/v1/agent_bots/${params.agentBotId}`,
      headers: params.headers,
      resource: 'agentBots',
      operation: 'delete',
    });
  }
}
