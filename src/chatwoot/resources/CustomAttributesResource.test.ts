import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import CustomAttributesResource from '@integrations/message/providers/chatwoot/resources/CustomAttributesResource';

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

describe('CustomAttributesResource', () => {
  it('should list all custom attributes in an account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CustomAttributesResource(http);

    await resource.listAll({
      accountId: 1,
      attributeModel: 0,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/custom_attribute_definitions?attribute_model=0',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should add a new custom attribute', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CustomAttributesResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        attribute_display_name: 'Custom Attribute',
        attribute_display_type: 0,
        attribute_description: 'This is a custom attribute',
        attribute_key: 'custom_attribute',
        attribute_values: ['value1', 'value2'],
        attribute_model: 0,
        regex_pattern: '^[a-zA-Z0-9]+$',
        regex_cue: 'Please enter a valid value',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/custom_attribute_definitions',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        attribute_display_name: 'Custom Attribute',
        attribute_display_type: 0,
        attribute_description: 'This is a custom attribute',
        attribute_key: 'custom_attribute',
        attribute_values: ['value1', 'value2'],
        attribute_model: 0,
        regex_pattern: '^[a-zA-Z0-9]+$',
        regex_cue: 'Please enter a valid value',
      }),
    );
  });

  it('should get a custom attribute details', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CustomAttributesResource(http);

    await resource.get({
      accountId: 1,
      customAttributeId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/custom_attribute_definitions/2',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should update a custom attribute', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CustomAttributesResource(http);

    await resource.update({
      accountId: 1,
      customAttributeId: 2,
      headers: { 'Content-Type': 'application/json' },
      body: {
        attribute_display_name: 'Custom Attribute',
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/custom_attribute_definitions/2',
    );
    expect(init?.method).toBe('PATCH');
  });

  it('should remove a custom attribute from account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CustomAttributesResource(http);

    await resource.delete({
      accountId: 1,
      customAttributeId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/custom_attribute_definitions/2',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
