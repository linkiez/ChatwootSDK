import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootContactsApiCreateContactBody = Record<string, unknown>;

export type ChatwootContactsApiUpdateContactBody = Record<string, unknown>;

export type ChatwootContactsApiCreateContactParams = {
  inboxIdentifier: string;
  body: ChatwootContactsApiCreateContactBody;
  headers?: Record<string, string>;
};

export type ChatwootContactsApiGetContactParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  headers?: Record<string, string>;
};

export type ChatwootContactsApiUpdateContactParams = {
  inboxIdentifier: string;
  contactIdentifier: string;
  body: ChatwootContactsApiUpdateContactBody;
  headers?: Record<string, string>;
};

export default class ContactsApiResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Create a contact.
   *
   * Chatwoot API: POST /public/api/v1/inboxes/{inbox_identifier}/contacts
   */
  async createContact(
    params: ChatwootContactsApiCreateContactParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts`,
      headers: params.headers,
      body: params.body,
      resource: 'contactsApi',
      operation: 'createContact',
    });
  }

  /**
   * Get a contact.
   *
   * Chatwoot API: GET /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}
   */
  async getContact(
    params: ChatwootContactsApiGetContactParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}`,
      headers: params.headers,
      resource: 'contactsApi',
      operation: 'getContact',
    });
  }

  /**
   * Update a contact.
   *
   * Chatwoot API: PATCH /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}
   */
  async updateContact(
    params: ChatwootContactsApiUpdateContactParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/public/api/v1/inboxes/${params.inboxIdentifier}/contacts/${params.contactIdentifier}`,
      headers: params.headers,
      body: params.body,
      resource: 'contactsApi',
      operation: 'updateContact',
    });
  }
}
