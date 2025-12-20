import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ConversationAssignmentsResource from '@integrations/message/providers/chatwoot/resources/ConversationAssignmentsResource';

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

describe('ConversationAssignmentsResource', () => {
  it('should assign a conversation to an agent', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ConversationAssignmentsResource(http);

    await resource.assign({
      accountId: 1,
      conversationId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: { assignee_id: 10 },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/conversations/2/assignments',
    );
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual(
      expect.objectContaining({
        api_access_token: 'token',
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(JSON.stringify({ assignee_id: 10 }));
  });

  it('should assign a conversation to a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ConversationAssignmentsResource(http);

    await resource.assign({
      accountId: 1,
      conversationId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: { team_id: 7 },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/conversations/2/assignments',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ team_id: 7 }));
  });
});
