import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootCustomFilterType = 'conversation' | 'contact' | 'report';

export type ChatwootCustomFiltersListAllParams = {
  accountId: number;
  filterType?: ChatwootCustomFilterType;
  headers?: Record<string, string>;
};

export type ChatwootCustomFiltersCreateBody = {
  name: string;
  type: ChatwootCustomFilterType;
  query: Record<string, unknown>;
};

export type ChatwootCustomFiltersCreateParams = {
  accountId: number;
  body: ChatwootCustomFiltersCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootCustomFiltersGetParams = {
  accountId: number;
  customFilterId: number;
  headers?: Record<string, string>;
};

export type ChatwootCustomFiltersUpdateBody =
  Partial<ChatwootCustomFiltersCreateBody>;

export type ChatwootCustomFiltersUpdateParams = {
  accountId: number;
  customFilterId: number;
  body: ChatwootCustomFiltersUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootCustomFiltersDeleteParams = {
  accountId: number;
  customFilterId: number;
  headers?: Record<string, string>;
};

export default class CustomFiltersResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all custom filters in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/custom_filters
   */
  async listAll(params: ChatwootCustomFiltersListAllParams): Promise<unknown> {
    const query = params.filterType
      ? `?filter_type=${encodeURIComponent(params.filterType)}`
      : '';

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/custom_filters${query}`,
      headers: params.headers,
      resource: 'customFilters',
      operation: 'listAll',
    });
  }

  /**
   * Creates a custom filter in the account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/custom_filters
   */
  async create(params: ChatwootCustomFiltersCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/custom_filters`,
      headers: params.headers,
      body: params.body,
      resource: 'customFilters',
      operation: 'create',
    });
  }

  /**
   * Gets a custom filter details.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/custom_filters/{custom_filter_id}
   */
  async get(params: ChatwootCustomFiltersGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/custom_filters/${params.customFilterId}`,
      headers: params.headers,
      resource: 'customFilters',
      operation: 'get',
    });
  }

  /**
   * Updates a custom filter.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/custom_filters/{custom_filter_id}
   */
  async update(params: ChatwootCustomFiltersUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/custom_filters/${params.customFilterId}`,
      headers: params.headers,
      body: params.body,
      resource: 'customFilters',
      operation: 'update',
    });
  }

  /**
   * Deletes a custom filter.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/custom_filters/{custom_filter_id}
   */
  async delete(params: ChatwootCustomFiltersDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/custom_filters/${params.customFilterId}`,
      headers: params.headers,
      resource: 'customFilters',
      operation: 'delete',
    });
  }
}
