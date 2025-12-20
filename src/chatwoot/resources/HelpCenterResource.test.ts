import ChatwootHttpClient, {
  ChatwootFetchLike,
  ChatwootFetchResponse,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import HelpCenterResource from '@integrations/message/providers/chatwoot/resources/HelpCenterResource';

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

describe('HelpCenterResource', () => {
  it('should list all portals in an account', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new HelpCenterResource(http);

    await resource.listPortals({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://cw.local/api/v1/accounts/1/portals',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          api_access_token: 'token',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should add a new portal', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local/',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new HelpCenterResource(http);

    await resource.createPortal({
      accountId: 1,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Handbook',
        slug: 'handbook',
        color: '#FFFFFF',
        header_text: 'Handbook',
        homepage_link: 'https://www.chatwoot.com/',
        page_title: 'Handbook',
        custom_domain: 'chatwoot.help',
        archived: false,
        config: {
          allowed_locales: ['en', 'es'],
          default_locale: 'en',
        },
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/portals');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Handbook',
        slug: 'handbook',
        color: '#FFFFFF',
        header_text: 'Handbook',
        homepage_link: 'https://www.chatwoot.com/',
        page_title: 'Handbook',
        custom_domain: 'chatwoot.help',
        archived: false,
        config: {
          allowed_locales: ['en', 'es'],
          default_locale: 'en',
        },
      }),
    );
  });

  it('should update a portal', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new HelpCenterResource(http);

    await resource.updatePortal({
      accountId: 1,
      portalId: 'handbook',
      headers: { 'Content-Type': 'application/json' },
      body: {
        archived: true,
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://cw.local/api/v1/accounts/1/portals/handbook');
    expect(init?.method).toBe('PATCH');
    expect(init?.body).toBe(JSON.stringify({ archived: true }));
  });

  it('should add a new category', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new HelpCenterResource(http);

    await resource.createCategory({
      accountId: 1,
      portalId: 'handbook',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Category Name',
        description: 'Category description',
        position: 1,
        slug: 'category-name',
        locale: 'en',
        icon: '📚',
        parent_category_id: 1,
        associated_category_id: 2,
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/portals/handbook/categories',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        name: 'Category Name',
        description: 'Category description',
        position: 1,
        slug: 'category-name',
        locale: 'en',
        icon: '📚',
        parent_category_id: 1,
        associated_category_id: 2,
      }),
    );
  });

  it('should add a new article', async () => {
    const fetchImpl = createFetchMock();

    const http = new ChatwootHttpClient({
      baseUrl: 'https://cw.local',
      apiAccessToken: 'token',
      fetchImpl,
    });

    const resource = new HelpCenterResource(http);

    await resource.createArticle({
      accountId: 1,
      portalId: 'handbook',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: 'Article Title',
        slug: 'article-title',
        position: 1,
        content: 'This is the content of the article',
        description: 'This is the description of the article',
        category_id: 1,
        author_id: 1,
        associated_article_id: 2,
        status: 1,
        locale: 'en',
        meta: {
          tags: ['article_name'],
          title: 'article title',
          description: 'article description',
        },
      },
    });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(
      'https://cw.local/api/v1/accounts/1/portals/handbook/articles',
    );
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(
      JSON.stringify({
        title: 'Article Title',
        slug: 'article-title',
        position: 1,
        content: 'This is the content of the article',
        description: 'This is the description of the article',
        category_id: 1,
        author_id: 1,
        associated_article_id: 2,
        status: 1,
        locale: 'en',
        meta: {
          tags: ['article_name'],
          title: 'article title',
          description: 'article description',
        },
      }),
    );
  });
});
