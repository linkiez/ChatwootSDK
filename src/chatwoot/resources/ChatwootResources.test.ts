import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ContactsResource from '@integrations/message/providers/chatwoot/resources/ContactsResource';
import ConversationsResource from '@integrations/message/providers/chatwoot/resources/ConversationsResource';
import MessagesResource from '@integrations/message/providers/chatwoot/resources/MessagesResource';

function createFetchMock(): jest.MockedFunction<ChatwootFetchLike> {
  return jest
    .fn<ReturnType<ChatwootFetchLike>, Parameters<ChatwootFetchLike>>()
    .mockImplementation(async (): Promise<ChatwootFetchResponse> => {
      return {
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
        headers: {
          get: () => null,
        },
      };
    });
}

describe('Chatwoot resources', () => {
  it('ContactsResource.search should call contacts search endpoint', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ContactsResource(http);

    await resource.search({
      accountId: 1,
      query: '00000000-0000-0000-0000-000000000001',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/contacts/search?q=00000000-0000-0000-0000-000000000001',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('ContactsResource.create should call contacts create endpoint', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ContactsResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        identifier: 'id',
        name: 'Destinatário',
        email: 'dest@jcm.com',
      },
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/contacts');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual(
      expect.objectContaining({
        api_access_token: 'token',
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(
      JSON.stringify({
        identifier: 'id',
        name: 'Destinatário',
        email: 'dest@jcm.com',
      }),
    );
  });

  it('ConversationsResource.listByContact should call conversations list endpoint', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ConversationsResource(http);

    await resource.listByContact({
      accountId: 1,
      contactId: 10,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/contacts/10/conversations',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('ConversationsResource.create should call conversations create endpoint', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ConversationsResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        inbox_id: 5,
        contact_id: 10,
        source_id: 'id',
      },
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/conversations');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual(
      expect.objectContaining({
        api_access_token: 'token',
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(
      JSON.stringify({
        inbox_id: 5,
        contact_id: 10,
        source_id: 'id',
      }),
    );
  });

  it('MessagesResource.create should call messages create endpoint', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new MessagesResource(http);

    await resource.create({
      accountId: 1,
      conversationId: 99,
      headers: { 'Content-Type': 'application/json' },
      body: {
        content: 'Olá',
        message_type: 'outgoing',
        private: false,
        content_type: 'text',
      },
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/conversations/99/messages',
    );
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual(
      expect.objectContaining({
        api_access_token: 'token',
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(
      JSON.stringify({
        content: 'Olá',
        message_type: 'outgoing',
        private: false,
        content_type: 'text',
      }),
    );
  });
});
