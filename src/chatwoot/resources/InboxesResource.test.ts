import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import InboxesResource from '@integrations/message/providers/chatwoot/resources/InboxesResource';

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

describe('InboxesResource', () => {
  it('should list all inboxes', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/inboxes',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should get an inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.get({
      accountId: 1,
      inboxId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inboxes/2');
    expect(init?.method).toBe('GET');
  });

  it('should create an inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Support',
        channel: {
          type: 'web_widget',
          website_url: 'https://example.com',
          welcome_title: 'Welcome',
          welcome_tagline: 'We are here to help you',
          widget_color: '#FF5733',
        },
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inboxes');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Support',
        channel: {
          type: 'web_widget',
          website_url: 'https://example.com',
          welcome_title: 'Welcome',
          welcome_tagline: 'We are here to help you',
          widget_color: '#FF5733',
        },
      }),
    );
  });

  it('should update an inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.update({
      accountId: 1,
      inboxId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Support Updated',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inboxes/2');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ name: 'Support Updated' }));
  });

  it('should show inbox agent bot', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.showAgentBot({
      accountId: 1,
      inboxId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inboxes/2/agent_bot');
    expect(init?.method).toBe('GET');
  });

  it('should set inbox agent bot', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.setAgentBot({
      accountId: 1,
      inboxId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: { agent_bot: 10 },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/inboxes/2/set_agent_bot',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ agent_bot: 10 }));
  });

  it('should list agents in inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.listAgents({
      accountId: 1,
      inboxId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inbox_members/2');
    expect(init?.method).toBe('GET');
  });

  it('should add a new agent to inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.addAgents({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        inbox_id: 2,
        user_ids: [1],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inbox_members');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ inbox_id: 2, user_ids: [1] }));
  });

  it('should remove an agent from inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.removeAgents({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        inbox_id: 2,
        user_ids: [1],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inbox_members');
    expect(init?.method).toBe('DELETE');
    expect(init?.body).toBe(JSON.stringify({ inbox_id: 2, user_ids: [1] }));
  });

  it('should update agents in inbox', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new InboxesResource(http);

    await resource.updateAgents({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        inbox_id: 2,
        user_ids: [1],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/inbox_members');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ inbox_id: 2, user_ids: [1] }));
  });
});
