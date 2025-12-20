import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import CsatSurveyPageResource from '@integrations/message/providers/chatwoot/resources/CsatSurveyPageResource';

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

describe('CsatSurveyPageResource', () => {
  it('should build CSAT survey page URL for a conversation', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new CsatSurveyPageResource(http);

    const url = resource.getSurveyPageUrl({
      conversationUuid: 123,
    });

    expect(url).toBe('https://cw.local/survey/responses/123');
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
