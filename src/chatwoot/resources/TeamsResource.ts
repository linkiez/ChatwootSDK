import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootTeamsListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootTeamsGetParams = {
  accountId: number;
  teamId: number;
  headers?: Record<string, string>;
};

export type ChatwootTeamUpsertBody = {
  name?: string;
  description?: string;
  allow_auto_assign?: boolean;
};

export type ChatwootTeamsCreateParams = {
  accountId: number;
  body: ChatwootTeamUpsertBody;
  headers?: Record<string, string>;
};

export type ChatwootTeamsUpdateParams = {
  accountId: number;
  teamId: number;
  body: ChatwootTeamUpsertBody;
  headers?: Record<string, string>;
};

export type ChatwootTeamsDeleteParams = {
  accountId: number;
  teamId: number;
  headers?: Record<string, string>;
};

export type ChatwootTeamsListAgentsParams = {
  accountId: number;
  teamId: number;
  headers?: Record<string, string>;
};

export type ChatwootTeamsMutateAgentsParams = {
  accountId: number;
  teamId: number;
  userIds: number[];
  headers?: Record<string, string>;
};

/**
 * Chatwoot Teams API wrapper.
 */
export default class TeamsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all teams available in the current account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/teams
   */
  async listAll(params: ChatwootTeamsListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/teams`,
      headers: params.headers,
      resource: 'teams',
      operation: 'listAll',
    });
  }

  /**
   * Fetches a team details.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/teams/{team_id}
   */
  async get(params: ChatwootTeamsGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}`,
      headers: params.headers,
      resource: 'teams',
      operation: 'get',
    });
  }

  /**
   * Creates a team in the account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/teams
   */
  async create(params: ChatwootTeamsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/teams`,
      headers: params.headers,
      body: params.body,
      resource: 'teams',
      operation: 'create',
    });
  }

  /**
   * Updates a team attributes.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/teams/{team_id}
   */
  async update(params: ChatwootTeamsUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}`,
      headers: params.headers,
      body: params.body,
      resource: 'teams',
      operation: 'update',
    });
  }

  /**
   * Deletes a team from the account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/teams/{team_id}
   */
  async delete(params: ChatwootTeamsDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}`,
      headers: params.headers,
      resource: 'teams',
      operation: 'delete',
    });
  }

  /**
   * Lists agents in a team.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/teams/{team_id}/team_members
   */
  async listAgents(params: ChatwootTeamsListAgentsParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}/team_members`,
      headers: params.headers,
      resource: 'teams',
      operation: 'listAgents',
    });
  }

  /**
   * Adds agents to a team.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/teams/{team_id}/team_members
   */
  async addAgents(params: ChatwootTeamsMutateAgentsParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}/team_members`,
      headers: params.headers,
      body: {
        user_ids: params.userIds,
      },
      resource: 'teams',
      operation: 'addAgents',
    });
  }

  /**
   * Removes agents from a team.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/teams/{team_id}/team_members
   */
  async removeAgents(
    params: ChatwootTeamsMutateAgentsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}/team_members`,
      headers: params.headers,
      body: {
        user_ids: params.userIds,
      },
      resource: 'teams',
      operation: 'removeAgents',
    });
  }

  /**
   * Replaces agents in a team (removes all except passed).
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/teams/{team_id}/team_members
   */
  async updateAgents(
    params: ChatwootTeamsMutateAgentsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/teams/${params.teamId}/team_members`,
      headers: params.headers,
      body: {
        user_ids: params.userIds,
      },
      resource: 'teams',
      operation: 'updateAgents',
    });
  }
}
