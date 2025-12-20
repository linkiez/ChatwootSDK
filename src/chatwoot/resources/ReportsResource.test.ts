import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ReportsResource from '@integrations/message/providers/chatwoot/resources/ReportsResource';

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

describe('ReportsResource', () => {
  it('should get account reports', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ReportsResource(http);

    await resource.getAccountReports({
      accountId: 1,
      metric: 'conversations_count',
      type: 'account',
      since: '1700000000',
      until: '1700000100',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v2/accounts/1/reports?metric=conversations_count&type=account&since=1700000000&until=1700000100',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should get account reports summary', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ReportsResource(http);

    await resource.getAccountReportsSummary({
      accountId: 1,
      type: 'account',
      since: '1700000000',
      until: '1700000100',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v2/accounts/1/reports/summary?type=account&since=1700000000&until=1700000100',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should get account conversation metrics', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ReportsResource(http);

    await resource.getAccountConversationMetrics({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v2/accounts/1/reports/conversations?type=account',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should get agent conversation metrics', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ReportsResource(http);

    await resource.getAgentConversationMetrics({
      accountId: 1,
      userId: 2,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v2/accounts/1/reports/conversations?type=agent&user_id=2',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should list reporting events', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ReportsResource(http);

    await resource.listReportingEvents({
      accountId: 1,
      page: 2,
      name: 'resolution',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/reporting_events?page=2&name=resolution',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
