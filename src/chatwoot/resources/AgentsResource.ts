import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAgentsListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootAgentRole = 'agent' | 'administrator';
export type ChatwootAgentAvailabilityStatus = 'available' | 'busy' | 'offline';

export type ChatwootAgentsCreateBody = {
  name: string;
  email: string;
  role: ChatwootAgentRole;
  availability_status?: ChatwootAgentAvailabilityStatus;
  auto_offline?: boolean;
};

export type ChatwootAgentsCreateParams = {
  accountId: number;
  body: ChatwootAgentsCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAgentsUpdateBody = {
  role: ChatwootAgentRole;
  availability_status?: ChatwootAgentAvailabilityStatus;
  auto_offline?: boolean;
};

export type ChatwootAgentsUpdateParams = {
  accountId: number;
  agentId: number;
  body: ChatwootAgentsUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootAgentsDeleteParams = {
  accountId: number;
  agentId: number;
  headers?: Record<string, string>;
};

export default class AgentsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists agents in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/agents
   */
  async listAll(params: ChatwootAgentsListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/agents`,
      headers: params.headers,
      resource: 'agents',
      operation: 'listAll',
    });
  }

  /**
   * Adds a new agent to an account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/agents
   */
  async create(params: ChatwootAgentsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/agents`,
      headers: params.headers,
      body: params.body,
      resource: 'agents',
      operation: 'create',
    });
  }

  /**
   * Updates an agent in an account.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/agents/{id}
   */
  async update(params: ChatwootAgentsUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/agents/${params.agentId}`,
      headers: params.headers,
      body: params.body,
      resource: 'agents',
      operation: 'update',
    });
  }

  /**
   * Removes an agent from an account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/agents/{id}
   */
  async delete(params: ChatwootAgentsDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/agents/${params.agentId}`,
      headers: params.headers,
      resource: 'agents',
      operation: 'delete',
    });
  }
}
