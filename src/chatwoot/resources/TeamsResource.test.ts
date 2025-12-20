import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import TeamsResource from '@integrations/message/providers/chatwoot/resources/TeamsResource';

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

describe('TeamsResource', () => {
  it('should list all teams', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/teams',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should get team details', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.get({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/teams/2',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should create a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Support Team',
        description: 'This is a team of support agents',
        allow_auto_assign: true,
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/teams');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Support Team',
        description: 'This is a team of support agents',
        allow_auto_assign: true,
      }),
    );
  });

  it('should update a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.update({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Support Team',
        description: 'This is a team of support agents',
        allow_auto_assign: true,
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/teams/2');
    expect(init?.method).toBe('PATCH');
  });

  it('should delete a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.delete({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/teams/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('should list agents in a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.listAgents({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/teams/2/team_members',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should add agents to a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.addAgents({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
      userIds: [1],
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/teams/2/team_members');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ user_ids: [1] }));
  });

  it('should remove agents from a team', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.removeAgents({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
      userIds: [123],
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/teams/2/team_members');
    expect(init?.method).toBe('DELETE');
    expect(init?.body).toBe(JSON.stringify({ user_ids: [123] }));
  });

  it('should replace agents in a team (update agents)', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new TeamsResource(http);

    await resource.updateAgents({
      accountId: 1,
      teamId: 2,
      headers: { 'Content-Type': 'application/json' },
      userIds: [1],
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/teams/2/team_members');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ user_ids: [1] }));
  });
});
