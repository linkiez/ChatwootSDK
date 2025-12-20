import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootProfileFetchUserProfileParams = {
  headers?: Record<string, string>;
};

/**
 * Chatwoot Profile API wrapper.
 */
export default class ProfileResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Fetches the current authenticated user profile.
   *
   * Chatwoot API: GET /api/v1/profile
   */
  async fetchUserProfile(
    params: ChatwootProfileFetchUserProfileParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: '/api/v1/profile',
      headers: params.headers,
      resource: 'profile',
      operation: 'fetchUserProfile',
    });
  }
}
