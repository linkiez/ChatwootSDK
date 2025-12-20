import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import { ChatwootAuthError } from '@integrations/message/providers/chatwoot/ChatwootErrors';
import ProfileResource from '@integrations/message/providers/chatwoot/resources/ProfileResource';

describe('ProfileResource', () => {
  it('should call fetch user profile endpoint', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest
      .fn<ReturnType<ChatwootFetchLike>, Parameters<ChatwootFetchLike>>()
      .mockImplementation(async (): Promise<ChatwootFetchResponse> => {
        return {
          ok: true,
          status: 200,
          json: async () => ({ id: 123 }),
          headers: {
            get: () => null,
          },
        };
      });

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ProfileResource(http);

    const result = await resource.fetchUserProfile({
      headers: { 'Content-Type': 'application/json' },
    });

    expect(result).toEqual({ id: 123 });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/profile',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should throw ChatwootAuthError on 401', async () => {
    const fetchImpl: jest.MockedFunction<ChatwootFetchLike> = jest
      .fn<ReturnType<ChatwootFetchLike>, Parameters<ChatwootFetchLike>>()
      .mockImplementation(async (): Promise<ChatwootFetchResponse> => {
        return {
          ok: false,
          status: 401,
          json: async () => ({ error: 'unauthorized' }),
          headers: {
            get: () => null,
          },
        };
      });

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new ProfileResource(http);

    await expect(resource.fetchUserProfile({})).rejects.toThrow(
      ChatwootAuthError,
    );
  });
});
