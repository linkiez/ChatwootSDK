import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootReportsMetric =
  | 'conversations_count'
  | 'incoming_messages_count'
  | 'outgoing_messages_count'
  | 'avg_first_response_time'
  | 'avg_resolution_time'
  | 'resolutions_count';

export type ChatwootReportsType =
  | 'account'
  | 'agent'
  | 'inbox'
  | 'label'
  | 'team';

export type ChatwootReportsGetAccountReportsParams = {
  accountId: number;
  metric: ChatwootReportsMetric;
  type: ChatwootReportsType;
  id?: string;
  since?: string;
  until?: string;
  headers?: Record<string, string>;
};

export type ChatwootReportsGetAccountReportsSummaryParams = {
  accountId: number;
  type: ChatwootReportsType;
  id?: string;
  since?: string;
  until?: string;
  headers?: Record<string, string>;
};

export type ChatwootReportsGetAccountConversationMetricsParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootReportsGetAgentConversationMetricsParams = {
  accountId: number;
  userId: number;
  headers?: Record<string, string>;
};

export type ChatwootReportsListReportingEventsParams = {
  accountId: number;
  page?: number;
  since?: string | number;
  until?: string | number;
  inboxId?: number;
  userId?: number;
  name?: string;
  headers?: Record<string, string>;
};

function buildQueryString(
  entries: Array<[string, string | number | undefined]>,
): string {
  const parts = entries
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    });

  if (parts.length === 0) return '';
  return `?${parts.join('&')}`;
}

export default class ReportsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Get account reports for a specific type, metric and date range.
   *
   * Chatwoot API: GET /api/v2/accounts/{account_id}/reports
   */
  async getAccountReports(
    params: ChatwootReportsGetAccountReportsParams,
  ): Promise<unknown> {
    const query = buildQueryString([
      ['metric', params.metric],
      ['type', params.type],
      ['id', params.id],
      ['since', params.since],
      ['until', params.until],
    ]);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v2/accounts/${params.accountId}/reports${query}`,
      headers: params.headers,
      resource: 'reports',
      operation: 'getAccountReports',
    });
  }

  /**
   * Get account reports summary for a specific type and date range.
   *
   * Chatwoot API: GET /api/v2/accounts/{account_id}/reports/summary
   */
  async getAccountReportsSummary(
    params: ChatwootReportsGetAccountReportsSummaryParams,
  ): Promise<unknown> {
    const query = buildQueryString([
      ['type', params.type],
      ['id', params.id],
      ['since', params.since],
      ['until', params.until],
    ]);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v2/accounts/${params.accountId}/reports/summary${query}`,
      headers: params.headers,
      resource: 'reports',
      operation: 'getAccountReportsSummary',
    });
  }

  /**
   * Get conversation metrics for account.
   *
   * Chatwoot API: GET /api/v2/accounts/{account_id}/reports/conversations?type=account
   */
  async getAccountConversationMetrics(
    params: ChatwootReportsGetAccountConversationMetricsParams,
  ): Promise<unknown> {
    const query = buildQueryString([['type', 'account']]);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v2/accounts/${params.accountId}/reports/conversations${query}`,
      headers: params.headers,
      resource: 'reports',
      operation: 'getAccountConversationMetrics',
    });
  }

  /**
   * Get conversation metrics for agent.
   *
   * Chatwoot API: GET /api/v2/accounts/{account_id}/reports/conversations?type=agent&user_id={user_id}
   */
  async getAgentConversationMetrics(
    params: ChatwootReportsGetAgentConversationMetricsParams,
  ): Promise<unknown> {
    const query = buildQueryString([
      ['type', 'agent'],
      ['user_id', params.userId],
    ]);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v2/accounts/${params.accountId}/reports/conversations${query}`,
      headers: params.headers,
      resource: 'reports',
      operation: 'getAgentConversationMetrics',
    });
  }

  /**
   * Get paginated reporting events for the account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/reporting_events
   */
  async listReportingEvents(
    params: ChatwootReportsListReportingEventsParams,
  ): Promise<unknown> {
    const query = buildQueryString([
      ['page', params.page],
      ['since', params.since !== undefined ? String(params.since) : undefined],
      ['until', params.until !== undefined ? String(params.until) : undefined],
      ['inbox_id', params.inboxId],
      ['user_id', params.userId],
      ['name', params.name],
    ]);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/reporting_events${query}`,
      headers: params.headers,
      resource: 'reports',
      operation: 'listReportingEvents',
    });
  }
}
