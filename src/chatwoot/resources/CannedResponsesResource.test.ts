import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import CannedResponsesResource from '@integrations/message/providers/chatwoot/resources/CannedResponsesResource';

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

describe('CannedResponsesResource', () => {
  it('should list all canned responses', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CannedResponsesResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/canned_responses',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should add a canned response', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CannedResponsesResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        content: 'Hello, {{contact.name}}! Welcome to our service.',
        short_code: 'welcome',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/canned_responses');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        content: 'Hello, {{contact.name}}! Welcome to our service.',
        short_code: 'welcome',
      }),
    );
  });

  it('should update a canned response', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CannedResponsesResource(http);

    await resource.update({
      accountId: 1,
      cannedResponseId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        content: 'Hello, {{contact.name}}! Welcome to our service.',
        short_code: 'welcome',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/canned_responses/2');
    expect(init?.method).toBe('PATCH');
  });

  it('should delete a canned response', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CannedResponsesResource(http);

    await resource.delete({
      accountId: 1,
      cannedResponseId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/canned_responses/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
