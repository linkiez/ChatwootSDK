import ChatwootHttpClient, {
  ChatwootHttpClientOptions,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import ContactsApiResource from '@integrations/message/providers/chatwoot/client-api/resources/ContactsApiResource';
import ConversationsApiResource from '@integrations/message/providers/chatwoot/client-api/resources/ConversationsApiResource';
import MessagesApiResource from '@integrations/message/providers/chatwoot/client-api/resources/MessagesApiResource';

export type ClientApiClientOptions = {
  baseUrl: string;
  timeoutMs?: number;
  fetchImpl?: ChatwootHttpClientOptions['fetchImpl'];
};

export default class ClientApiClient {
  public readonly http: ChatwootHttpClient;

  public readonly contacts: ContactsApiResource;

  public readonly conversations: ConversationsApiResource;

  public readonly messages: MessagesApiResource;

  constructor(options: ClientApiClientOptions) {
    this.http = new ChatwootHttpClient({
      baseUrl: options.baseUrl,
      timeoutMs: options.timeoutMs,
      fetchImpl: options.fetchImpl,
    });

    this.contacts = new ContactsApiResource(this.http);
    this.conversations = new ConversationsApiResource(this.http);
    this.messages = new MessagesApiResource(this.http);
  }
}
