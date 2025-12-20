import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ContactsApiResource from '@integrations/message/providers/chatwoot/client-api/resources/ContactsApiResource';

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

describe('ContactsApiResource', () => {
  it('should create a contact', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      fetchImpl,
    });

    const resource = new ContactsApiResource(http);

    await resource.createContact({
      inboxIdentifier: 'inbox_123',
      headers: { 'Content-Type': 'application/json' },
      body: {
        identifier: '1234567890',
        identifier_hash: 'hash',
        email: 'alice@acme.inc',
        name: 'Alice',
        phone_number: '+123456789',
        custom_attributes: {},
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts',
    );
    expect(init?.method).toBe('POST');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
    expect(init?.headers).toEqual(
      expect.objectContaining({
        'Content-Type': 'application/json',
      }),
    );
    expect(init?.body).toBe(
      JSON.stringify({
        identifier: '1234567890',
        identifier_hash: 'hash',
        email: 'alice@acme.inc',
        name: 'Alice',
        phone_number: '+123456789',
        custom_attributes: {},
      }),
    );
  });

  it('should get a contact', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      fetchImpl,
    });

    const resource = new ContactsApiResource(http);

    await resource.getContact({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456',
    );
    expect(init?.method).toBe('GET');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
  });

  it('should update a contact', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      fetchImpl,
    });

    const resource = new ContactsApiResource(http);

    await resource.updateContact({
      inboxIdentifier: 'inbox_123',
      contactIdentifier: 'contact_456',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Alice Updated',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/public/api/v1/inboxes/inbox_123/contacts/contact_456',
    );
    expect(init?.method).toBe('PATCH');
    expect(
      (init?.headers as Record<string, string> | undefined)?.api_access_token,
    ).toBeUndefined();
    expect(init?.body).toBe(JSON.stringify({ name: 'Alice Updated' }));
  });
});
