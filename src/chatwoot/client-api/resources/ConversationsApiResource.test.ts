import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ConversationsApiResource from '@integrations/message/providers/chatwoot/client-api/resources/ConversationsApiResource';

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

describe('ConversationsApiResource', () => {
  it('should list conversations', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      fetchImpl,
    });

    const resource = new ConversationsApiResource(http);

    await resource.listConversations({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456/conversations',
    );
    expect(init?.method).toBe('GET');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
  });

  it('should create a conversation', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      fetchImpl,
    });

    const resource = new ConversationsApiResource(http);

    await resource.createConversation({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456/conversations',
    );
    expect(init?.method).toBe('POST');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
    expect(init?.body).toBeUndefined();
  });
});
