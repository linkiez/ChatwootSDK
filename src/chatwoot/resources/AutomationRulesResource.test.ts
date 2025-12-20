import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import AutomationRulesResource from '@integrations/message/providers/chatwoot/resources/AutomationRulesResource';

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

describe('AutomationRulesResource', () => {
  it('should list all automation rules', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AutomationRulesResource(http);

    await resource.listAll({
      accountId: 1,
      page: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/automation_rules?page=2',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should add a new automation rule', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AutomationRulesResource(http);

    await resource.create({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Add label on message create event',
        description:
          'Add label support and sales on message create event if incoming message content contains text help',
        event_name: 'message_created',
        active: true,
        actions: [
          {
            action_name: 'add_label',
            action_params: ['support'],
          },
        ],
        conditions: [
          {
            attribute_key: 'content',
            filter_operator: 'contains',
            query_operator: 'OR',
            values: ['help'],
          },
        ],
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/automation_rules');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Add label on message create event',
        description:
          'Add label support and sales on message create event if incoming message content contains text help',
        event_name: 'message_created',
        active: true,
        actions: [
          {
            action_name: 'add_label',
            action_params: ['support'],
          },
        ],
        conditions: [
          {
            attribute_key: 'content',
            filter_operator: 'contains',
            query_operator: 'OR',
            values: ['help'],
          },
        ],
      }),
    );
  });

  it('should get automation rule details', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AutomationRulesResource(http);

    await resource.get({
      accountId: 1,
      automationRuleId: 90,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/automation_rules/90',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should update an automation rule', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AutomationRulesResource(http);

    await resource.update({
      accountId: 1,
      automationRuleId: 90,
      headers: { 'Content-Type': 'application/json' },
      body: {
        active: false,
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/automation_rules/90');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ active: false }));
  });

  it('should remove an automation rule from account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new AutomationRulesResource(http);

    await resource.delete({
      accountId: 1,
      automationRuleId: 90,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/automation_rules/90',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
