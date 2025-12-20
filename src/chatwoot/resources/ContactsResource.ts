import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootContactsSearchParams = {
  accountId: number;
  query: string;
  headers?: Record<string, string>;
};

export type ChatwootContactCreateBody = {
  identifier: string;
  name?: string;
  email?: string;
  phone_number?: string;
};

export type ChatwootContactsCreateParams = {
  accountId: number;
  body: ChatwootContactCreateBody;
  headers?: Record<string, string>;
};

/**
 * Chatwoot Contacts API wrapper.
 */
export default class ContactsResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Searches contacts by a query string.
   *
   * @param params - Search parameters
   * @returns Chatwoot API response payload
   */
  async search(params: ChatwootContactsSearchParams): Promise<unknown> {
    const encoded = encodeURIComponent(params.query);

    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/contacts/search?q=${encoded}`,
      headers: params.headers,
      resource: 'contacts',
      operation: 'search',
    });
  }

  /**
   * Creates a contact.
   *
   * @param params - Create parameters
   * @returns Chatwoot API response payload
   */
  async create(params: ChatwootContactsCreateParams): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/contacts`,
      headers: params.headers,
      body: params.body,
      resource: 'contacts',
      operation: 'create',
    });
  }
}
