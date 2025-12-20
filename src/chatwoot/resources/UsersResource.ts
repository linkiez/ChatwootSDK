import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootUsersCreateBody = {
  name: string;
  display_name?: string;
  email: string;
  password: string;
  custom_attributes?: Record<string, unknown>;
};

export type ChatwootUsersCreateParams = {
  body: ChatwootUsersCreateBody;
  headers?: Record<string, string>;
};

export type ChatwootUsersGetParams = {
  userId: number;
  headers?: Record<string, string>;
};

export type ChatwootUsersUpdateBody = Partial<ChatwootUsersCreateBody>;

export type ChatwootUsersUpdateParams = {
  userId: number;
  body: ChatwootUsersUpdateBody;
  headers?: Record<string, string>;
};

export type ChatwootUsersDeleteParams = {
  userId: number;
  headers?: Record<string, string>;
};

export default class UsersResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Creates a user in the Chatwoot platform.
   *
   * Chatwoot API: POST /platform/api/v1/users
   */
  async create(params: ChatwootUsersCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: '/platform/api/v1/users',
      headers: params.headers,
      body: params.body,
      resource: 'users',
      operation: 'create',
    });
  }

  /**
   * Fetches a user details.
   *
   * Chatwoot API: GET /platform/api/v1/users/{id}
   */
  async get(params: ChatwootUsersGetParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/platform/api/v1/users/${params.userId}`,
      headers: params.headers,
      resource: 'users',
      operation: 'get',
    });
  }

  /**
   * Updates a user attributes.
   *
   * Chatwoot API: PATCH /platform/api/v1/users/{id}
   */
  async update(params: ChatwootUsersUpdateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/platform/api/v1/users/${params.userId}`,
      headers: params.headers,
      body: params.body,
      resource: 'users',
      operation: 'update',
    });
  }

  /**
   * Deletes a user.
   *
   * Chatwoot API: DELETE /platform/api/v1/users/{id}
   */
  async delete(params: ChatwootUsersDeleteParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'DELETE',
      path: `/platform/api/v1/users/${params.userId}`,
      headers: params.headers,
      resource: 'users',
      operation: 'delete',
    });
  }
}
