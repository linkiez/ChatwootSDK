import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import IntegrationsResource from '@integrations/message/providers/chatwoot/resources/IntegrationsResource';

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

describe('IntegrationsResource', () => {
  it('should list all integration apps', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new IntegrationsResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/integrations/apps',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should create an integration hook', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new IntegrationsResource(http);

    await resource.createHook({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        appId: 10,
        inboxId: 20,
        status: 1,
        settings: {},
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/integrations/hooks');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        app_id: 10,
        inbox_id: 20,
        status: 1,
        settings: {},
      }),
    );
  });

  it('should update an integration hook', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new IntegrationsResource(http);

    await resource.updateHook({
      accountId: 1,
      hookId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        status: 1,
        settings: {},
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/integrations/hooks/2');
    expect(init?.method).toBe('PATCH');
  });

  it('should delete an integration hook', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new IntegrationsResource(http);

    await resource.deleteHook({
      accountId: 1,
      hookId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/integrations/hooks/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
