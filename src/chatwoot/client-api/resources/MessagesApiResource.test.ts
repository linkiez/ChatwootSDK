import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import MessagesApiResource from '@integrations/message/providers/chatwoot/client-api/resources/MessagesApiResource';

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

describe('MessagesApiResource', () => {
  it('should list messages', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      fetchImpl,
    });

    const resource = new MessagesApiResource(http);

    await resource.listMessages({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
      conversationId: 77,
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456/conversations/77/messages',
    );
    expect(init?.method).toBe('GET');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
    expect(init?.body).toBeUndefined();
  });

  it('should create a message', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      fetchImpl,
    });

    const resource = new MessagesApiResource(http);

    await resource.createMessage({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
      conversationId: 77,
      headers: { 'Content-Type': 'application/json' },
      body: {
        content: 'Olá!',
        message_type: 'incoming',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456/conversations/77/messages',
    );
    expect(init?.method).toBe('POST');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
    expect(init?.headers).toEqual(
      expect.objectContaining({
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(
      JSON.stringify({
        content: 'Olá!',
        message_type: 'incoming',
      }),
    );
  });
});
