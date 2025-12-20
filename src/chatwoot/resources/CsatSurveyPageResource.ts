import ChatwootHttpClient from '@integrations/message/providers/chatwoot/ChatwootHttpClient';

export type ChatwootCsatSurveyPageGetParams = {
  conversationUuid: number | string;
};

export default class CsatSurveyPageResource {
  private readonly http: ChatwootHttpClient;

  constructor(http: ChatwootHttpClient) {
    this.http = http;
  }

  /**
   * Returns the CSAT survey page URL for a conversation.
   *
   * Chatwoot API: GET /survey/responses/{conversation_uuid}
   */
  getSurveyPageUrl(params: ChatwootCsatSurveyPageGetParams): string {
    return this.http.buildUrl(`/survey/responses/${params.conversationUuid}`);
  }
}
