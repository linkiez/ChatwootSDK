import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import AccountUsersResource from '@integrations/message/providers/chatwoot/resources/AccountUsersResource';

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

describe('AccountUsersResource', () => {
  it('should list all account users', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountUsersResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/accounts/1/account_users',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should create an account user', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountUsersResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        user_id: 10,
        role: 'administrator',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/platform/api/v1/accounts/1/account_users',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({ user_id: 10, role: 'administrator' }),
    );
  });

  it('should delete an account user', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AccountUsersResource(http);

    await resource.delete({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/accounts/1/account_users',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
