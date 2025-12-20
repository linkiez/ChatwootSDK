import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import AgentBotsResource from '@integrations/message/providers/chatwoot/resources/AgentBotsResource';

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

describe('AgentBotsResource', () => {
  it('should list all agent bots', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AgentBotsResource(http);

    await resource.listAll({
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/agent_bots',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should create an agent bot', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AgentBotsResource(http);

    await resource.create({
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'My Agent Bot',
        description: 'This is a sample agent bot',
        outgoing_url: 'https://example.com/webhook',
        account_id: 1,
        avatar_url: 'https://example.com/avatar.png',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/platform/api/v1/agent_bots');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'My Agent Bot',
        description: 'This is a sample agent bot',
        outgoing_url: 'https://example.com/webhook',
        account_id: 1,
        avatar_url: 'https://example.com/avatar.png',
      }),
    );
  });

  it('should get an agent bot details', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AgentBotsResource(http);

    await resource.get({
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/platform/api/v1/agent_bots/2');
    expect(init?.method).toBe('GET');
  });

  it('should update an agent bot', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AgentBotsResource(http);

    await resource.update({
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'My Agent Bot',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/platform/api/v1/agent_bots/2');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ name: 'My Agent Bot' }));
  });

  it('should delete an agent bot', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AgentBotsResource(http);

    await resource.delete({
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/agent_bots/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
