import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootIntegrationsListAllParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootIntegrationHookCreateBody = {
  appId: number;
  inboxId?: number;
  status?: number;
  settings?: Record<string, unknown>;
};

export type ChatwootIntegrationHookCreateParams = {
  accountId: number;
  body: ChatwootIntegrationHookCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootIntegrationHookUpdateBody = {
  status?: number;
  settings?: Record<string, unknown>;
};

export type ChatwootIntegrationHookUpdateParams = {
  accountId: number;
  hookId: number;
  body: ChatwootIntegrationHookUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootIntegrationHookDeleteParams = {
  accountId: number;
  hookId: number;
  headers?: Record<string, string>;
};

export default class IntegrationsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all integration apps available for the account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/integrations/apps
   */
  async listAll(params: ChatwootIntegrationsListAllParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/integrations/apps`,
      headers: params.headers,
      resource: 'integrations',
      operation: 'listAll',
    });
  }

  /**
   * Creates an integration hook.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/integrations/hooks
   */
  async createHook(
    params: ChatwootIntegrationHookCreateParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/integrations/hooks`,
      headers: params.headers,
      body: {
        app_id: params.body.appId,
        inbox_id: params.body.inboxId,
        status: params.body.status,
        settings: params.body.settings,
      },
      resource: 'integrations',
      operation: 'createHook',
    });
  }

  /**
   * Updates an integration hook.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/integrations/hooks/{hook_id}
   */
  async updateHook(
    params: ChatwootIntegrationHookUpdateParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/integrations/hooks/${params.hookId}`,
      headers: params.headers,
      body: {
        status: params.body.status,
        settings: params.body.settings,
      },
      resource: 'integrations',
      operation: 'updateHook',
    });
  }

  /**
   * Deletes an integration hook.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/integrations/hooks/{hook_id}
   */
  async deleteHook(
    params: ChatwootIntegrationHookDeleteParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/integrations/hooks/${params.hookId}`,
      headers: params.headers,
      resource: 'integrations',
      operation: 'deleteHook',
    });
  }
}
