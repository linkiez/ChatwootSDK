import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import AccountAgentBotsResource from '@integrations/message/providers/chatwoot/resources/AccountAgentBotsResource';

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

describe('AccountAgentBotsResource', () => {
  it('should list all agent bots in account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountAgentBotsResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/agent_bots',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should create an agent bot in account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountAgentBotsResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'My Agent Bot',
        description: 'This is a sample agent bot',
        outgoing_url: 'https://example.com/webhook',
        avatar_url: 'https://example.com/avatar.png',
        bot_type: 0,
        bot_config: {},
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/agent_bots');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'My Agent Bot',
        description: 'This is a sample agent bot',
        outgoing_url: 'https://example.com/webhook',
        avatar_url: 'https://example.com/avatar.png',
        bot_type: 0,
        bot_config: {},
      }),
    );
  });

  it('should get an agent bot details in account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountAgentBotsResource(http);

    await resource.get({
      accountId: 1,
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/agent_bots/2');
    expect(init?.method).toBe('GET');
  });

  it('should update an agent bot in account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountAgentBotsResource(http);

    await resource.update({
      accountId: 1,
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'My Agent Bot',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/agent_bots/2');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ name: 'My Agent Bot' }));
  });

  it('should delete an agent bot in account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountAgentBotsResource(http);

    await resource.delete({
      accountId: 1,
      agentBotId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/agent_bots/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
