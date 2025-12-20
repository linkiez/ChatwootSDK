import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootHelpCenterListPortalsParams = {
  accountId: number;
  headers?: Record<string, string>;
};

export type ChatwootHelpCenterPortalConfig = {
  allowed_locales?: string[];
  default_locale?: string;
};

export type ChatwootHelpCenterCreatePortalBody = {
  name: string;
  slug: string;
  color?: string;
  header_text?: string;
  homepage_link?: string;
  page_title?: string;
  custom_domain?: string;
  archived?: boolean;
  config?: ChatwootHelpCenterPortalConfig;
};

export type ChatwootHelpCenterCreatePortalParams = {
  accountId: number;
  body: ChatwootHelpCenterCreatePortalBody;
  headers?: Record<string, string>;
};

export type ChatwootHelpCenterUpdatePortalBody =
  Partial<ChatwootHelpCenterCreatePortalBody>;

export type ChatwootHelpCenterUpdatePortalParams = {
  accountId: number;
  portalId: string;
  body: ChatwootHelpCenterUpdatePortalBody;
  headers?: Record<string, string>;
};

export type ChatwootHelpCenterCreateCategoryBody = {
  name: string;
  description?: string;
  position?: number;
  slug?: string;
  locale?: string;
  icon?: string;
  parent_category_id?: number;
  associated_category_id?: number;
};

export type ChatwootHelpCenterCreateCategoryParams = {
  accountId: number;
  portalId: string;
  body: ChatwootHelpCenterCreateCategoryBody;
  headers?: Record<string, string>;
};

export type ChatwootHelpCenterArticleMeta = {
  tags?: string[];
  title?: string;
  description?: string;
};

export type ChatwootHelpCenterCreateArticleBody = {
  title: string;
  slug: string;
  position?: number;
  content: string;
  description?: string;
  category_id?: number;
  author_id?: number;
  associated_article_id?: number;
  status?: number;
  locale?: string;
  meta?: ChatwootHelpCenterArticleMeta;
};

export type ChatwootHelpCenterCreateArticleParams = {
  accountId: number;
  portalId: string;
  body: ChatwootHelpCenterCreateArticleBody;
  headers?: Record<string, string>;
};

export default class HelpCenterResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Lists all portals in an account.
   *
   * Chatwoot API: GET /api/v1/accounts/{account_id}/portals
   */
  async listPortals(
    params: ChatwootHelpCenterListPortalsParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'GET',
      path: `/api/v1/accounts/${params.accountId}/portals`,
      headers: params.headers,
      resource: 'helpCenter',
      operation: 'listPortals',
    });
  }

  /**
   * Adds a new portal.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/portals
   */
  async createPortal(
    params: ChatwootHelpCenterCreatePortalParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/portals`,
      headers: params.headers,
      body: params.body,
      resource: 'helpCenter',
      operation: 'createPortal',
    });
  }

  /**
   * Updates a portal.
   *
   * Chatwoot API: PATCH /api/v1/accounts/{account_id}/portals/{id}
   */
  async updatePortal(
    params: ChatwootHelpCenterUpdatePortalParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'PATCH',
      path: `/api/v1/accounts/${params.accountId}/portals/${params.portalId}`,
      headers: params.headers,
      body: params.body,
      resource: 'helpCenter',
      operation: 'updatePortal',
    });
  }

  /**
   * Adds a new category.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/portals/{id}/categories
   */
  async createCategory(
    params: ChatwootHelpCenterCreateCategoryParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/portals/${params.portalId}/categories`,
      headers: params.headers,
      body: params.body,
      resource: 'helpCenter',
      operation: 'createCategory',
    });
  }

  /**
   * Adds a new article.
   *
   * Chatwoot API: POST /api/v1/accounts/{account_id}/portals/{id}/articles
   */
  async createArticle(
    params: ChatwootHelpCenterCreateArticleParams,
  ): Promise<unknown> {
    return this.http.requestJson({
      method: 'POST',
      path: `/api/v1/accounts/${params.accountId}/portals/${params.portalId}/articles`,
      headers: params.headers,
      body: params.body,
      resource: 'helpCenter',
      operation: 'createArticle',
    });
  }
}
