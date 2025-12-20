import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import UsersResource from '@integrations/message/providers/chatwoot/resources/UsersResource';

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

describe('UsersResource', () => {
  it('should create a user', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new UsersResource(http);

    await resource.create({
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Daniel',
        display_name: 'Dan',
        email: 'daniel@acme.inc',
        password: 'Password2!',
        custom_attributes: {},
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/platform/api/v1/users');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Daniel',
        display_name: 'Dan',
        email: 'daniel@acme.inc',
        password: 'Password2!',
        custom_attributes: {},
      }),
    );
  });

  it('should get user details', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new UsersResource(http);

    await resource.get({
      userId: 123,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/users/123',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should update a user', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new UsersResource(http);

    await resource.update({
      userId: 123,
      headers: { 'Content-Type': 'application/json' },
      body: {
        display_name: 'Dan',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/platform/api/v1/users/123');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ display_name: 'Dan' }));
  });

  it('should delete a user', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new UsersResource(http);

    await resource.delete({
      userId: 123,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/platform/api/v1/users/123',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
