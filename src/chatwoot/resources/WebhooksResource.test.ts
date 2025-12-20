import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import WebhooksResource from '@integrations/message/providers/chatwoot/resources/WebhooksResource';

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

describe('WebhooksResource', () => {
  it('should list all webhooks', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new WebhooksResource(http);

    await resource.listAll({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/webhooks',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should add a webhook', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new WebhooksResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        url: 'https://example.com/webhook',
        name: 'Test webhook',
        subscriptions: ['conversation_created', 'contact_created'],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/webhooks');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        url: 'https://example.com/webhook',
        name: 'Test webhook',
        subscriptions: ['conversation_created', 'contact_created'],
      }),
    );
  });

  it('should update a webhook object', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new WebhooksResource(http);

    await resource.update({
      accountId: 1,
      webhookId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        url: 'https://example.com/webhook',
        name: 'Test webhook',
        subscriptions: ['conversation_created'],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/webhooks/2');
    expect(init?.method).toBe('PATCH');
  });

  it('should delete a webhook', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new WebhooksResource(http);

    await resource.delete({
      accountId: 1,
      webhookId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/webhooks/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
