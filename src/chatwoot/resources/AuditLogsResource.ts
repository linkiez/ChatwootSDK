import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootAuditLogsListAllParams = {
  accountId: number;
  page?: number;
  headers?: Record<string, string>;
};

export default class AuditLogsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * List audit logs in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/audit_logs
   */
  async listAll(params: ChatwootAuditLogsListAllParams): Promise<unknown> {
    const query =
      params.page !== undefined
        ? `?page=${encodeURIComponent(String(params.page))}`
        : '';

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/audit_logs${query}`,
      headers: params.headers,
      resource: 'auditLogs',
      operation: 'listAll',
    });
  }
}
