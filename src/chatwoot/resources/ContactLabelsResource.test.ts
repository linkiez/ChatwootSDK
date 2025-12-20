import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ContactLabelsResource from '@integrations/message/providers/chatwoot/resources/ContactLabelsResource';

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

describe('ContactLabelsResource', () => {
  it('should list labels of a contact', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ContactLabelsResource(http);

    await resource.listLabels({
      accountId: 1,
      contactId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/contacts/2/labels');
    expect(init?.method).toBe('GET');
    expect(init?.headers).toEqual(
      expect.objectContaining({
        api_access_token: 'token',
        'Content-Type': 'application/json',
      }),
    );
  });

  it('should add labels to a contact', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ContactLabelsResource(http);

    await resource.addLabels({
      accountId: 1,
      contactId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: { labels: ['support', 'billing'] },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/contacts/2/labels');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ labels: ['support', 'billing'] }));
  });
});
