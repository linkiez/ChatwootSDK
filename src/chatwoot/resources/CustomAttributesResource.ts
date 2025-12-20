import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootCustomAttributeModel = 0 | 1;
export type ChatwootCustomAttributeDisplayType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ChatwootCustomAttributesListAllParams = {
  accountId: number;
  attributeModel: ChatwootCustomAttributeModel;
  headers?: Record<string, string>;
};

export type ChatwootCustomAttributesCreateBody = {
  attribute_display_name: string;
  attribute_display_type: ChatwootCustomAttributeDisplayType;
  attribute_description?: string;
  attribute_key: string;
  attribute_values?: string[];
  attribute_model: ChatwootCustomAttributeModel;
  regex_pattern?: string;
  regex_cue?: string;
  default_value?: string;
};

export type ChatwootCustomAttributesCreateParams = {
  accountId: number;
  body: ChatwootCustomAttributesCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootCustomAttributesGetParams = {
  accountId: number;
  customAttributeId: number;
  headers?: Record<string, string>;
};

export type ChatwootCustomAttributesUpdateBody =
  Partial<ChatwootCustomAttributesCreateBody>;

export type ChatwootCustomAttributesUpdateParams = {
  accountId: number;
  customAttributeId: number;
  body: ChatwootCustomAttributesUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootCustomAttributesDeleteParams = {
  accountId: number;
  customAttributeId: number;
  headers?: Record<string, string>;
};

export default class CustomAttributesResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all custom attributes in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/custom_attribute_definitions
   */
  async listAll(
    params: ChatwootCustomAttributesListAllParams,
  ): Promise<unknown> {
    const attributeModel = encodeURIComponent(String(params.attributeModel));

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/custom_attribute_definitions?attribute_model=${attributeModel}`,
      headers: params.headers,
      resource: 'customAttributes',
      operation: 'listAll',
    });
  }

  /**
   * Adds a new custom attribute to account.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/custom_attribute_definitions
   */
  async create(params: ChatwootCustomAttributesCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/custom_attribute_definitions`,
      headers: params.headers,
      body: params.body,
      resource: 'customAttributes',
      operation: 'create',
    });
  }

  /**
   * Gets a custom attribute details.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/custom_attribute_definitions/{id}
   */
  async get(params: ChatwootCustomAttributesGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/custom_attribute_definitions/${params.customAttributeId}`,
      headers: params.headers,
      resource: 'customAttributes',
      operation: 'get',
    });
  }

  /**
   * Updates a custom attribute in account.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/custom_attribute_definitions/{id}
   */
  async update(params: ChatwootCustomAttributesUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/custom_attribute_definitions/${params.customAttributeId}`,
      headers: params.headers,
      body: params.body,
      resource: 'customAttributes',
      operation: 'update',
    });
  }

  /**
   * Removes a custom attribute from account.
   *
   * Chatwoot API: DELETE /api/v1/accounts/{account_id}/custom_attribute_definitions/{id}
   */
  async delete(params: ChatwootCustomAttributesDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/api/v1/accounts/${params.accountId}/custom_attribute_definitions/${params.customAttributeId}`,
      headers: params.headers,
      resource: 'customAttributes',
      operation: 'delete',
    });
  }
}
