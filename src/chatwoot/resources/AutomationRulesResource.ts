import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAutomationRuleEventName =
  | 'conversation_created'
  | 'conversation_updated'
  | 'conversation_resolved'
  | 'message_created';

export type ChatwootAutomationRuleCondition = {
  attribute_key: string;
  filter_operator: string;
  values: Array<string | number | boolean>;
  query_operator?: string;
};

export type ChatwootAutomationRuleAction = {
  action_name: string;
  action_params?: Array<string | number | boolean>;
};

export type ChatwootAutomationRulesListAllParams = {
  accountId: number;
  page?: number;
  headers?: Record<string, string>;
};

export type ChatwootAutomationRulesCreateBody = {
  name: string;
  description?: string;
  event_name: ChatwootAutomationRuleEventName;
  active?: boolean;
  actions: ChatwootAutomationRuleAction[];
  conditions: ChatwootAutomationRuleCondition[];
};

export type ChatwootAutomationRulesCreateParams = {
  accountId: number;
  body: ChatwootAutomationRulesCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootAutomationRulesGetParams = {
  accountId: number;
  automationRuleId: number;
  headers?: Record<string, string>;
};

export type ChatwootAutomationRulesUpdateBody =
  Partial<ChatwootAutomationRulesCreateBody>;

export type ChatwootAutomationRulesUpdateParams = {
  accountId: number;
  automationRuleId: number;
  body: ChatwootAutomationRulesUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootAutomationRulesDeleteParams = {
  accountId: number;
  automationRuleId: number;
  headers?: Record<string, string>;
};

export default class AutomationRulesResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all automation rules in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/automation_rules
   */
  async listAll(
    params: ChatwootAutomationRulesListAllParams,
  ): Promise<unknown> {
    const query =
      params.page !== undefined
        ? `?page=${encodeURIComponent(String(params.page))}`
        : '';

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/automation_rules${query}`,
      headers: params.headers,
      resource: 'automationRules',
      operation: 'listAll',
    });
  }

  /**
   * Adds a new automation rule to the account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/automation_rules
   */
  async create(params: ChatwootAutomationRulesCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/automation_rules`,
      headers: params.headers,
      body: params.body,
      resource: 'automationRules',
      operation: 'create',
    });
  }

  /**
   * Gets automation rule details.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/automation_rules/{id}
   */
  async get(params: ChatwootAutomationRulesGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/automation_rules/${params.automationRuleId}`,
      headers: params.headers,
      resource: 'automationRules',
      operation: 'get',
    });
  }

  /**
   * Updates an automation rule.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/automation_rules/{id}
   */
  async update(params: ChatwootAutomationRulesUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/automation_rules/${params.automationRuleId}`,
      headers: params.headers,
      body: params.body,
      resource: 'automationRules',
      operation: 'update',
    });
  }

  /**
   * Removes an automation rule from an account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/automation_rules/{id}
   */
  async delete(params: ChatwootAutomationRulesDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/automation_rules/${params.automationRuleId}`,
      headers: params.headers,
      resource: 'automationRules',
      operation: 'delete',
    });
  }
}
