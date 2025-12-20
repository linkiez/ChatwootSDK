import ChatwootHttpClient, {
  ChatwootHttpClientOptions,
} from '@integrations/message/providers/chatwoot/ChatwootHttpClient';
import AccountAgentBotsResource from '@integrations/message/providers/chatwoot/resources/AccountAgentBotsResource';
import AccountResource from '@integrations/message/providers/chatwoot/resources/AccountResource';
import AccountsResource from '@integrations/message/providers/chatwoot/resources/AccountsResource';
import AccountUsersResource from '@integrations/message/providers/chatwoot/resources/AccountUsersResource';
import AgentBotsResource from '@integrations/message/providers/chatwoot/resources/AgentBotsResource';
import AgentsResource from '@integrations/message/providers/chatwoot/resources/AgentsResource';
import AuditLogsResource from '@integrations/message/providers/chatwoot/resources/AuditLogsResource';
import AutomationRulesResource from '@integrations/message/providers/chatwoot/resources/AutomationRulesResource';
import CannedResponsesResource from '@integrations/message/providers/chatwoot/resources/CannedResponsesResource';
import ContactLabelsResource from '@integrations/message/providers/chatwoot/resources/ContactLabelsResource';
import ContactsResource from '@integrations/message/providers/chatwoot/resources/ContactsResource';
import ConversationAssignmentsResource from '@integrations/message/providers/chatwoot/resources/ConversationAssignmentsResource';
import ConversationsResource from '@integrations/message/providers/chatwoot/resources/ConversationsResource';
import CsatSurveyPageResource from '@integrations/message/providers/chatwoot/resources/CsatSurveyPageResource';
import CustomAttributesResource from '@integrations/message/providers/chatwoot/resources/CustomAttributesResource';
import CustomFiltersResource from '@integrations/message/providers/chatwoot/resources/CustomFiltersResource';
import HelpCenterResource from '@integrations/message/providers/chatwoot/resources/HelpCenterResource';
import InboxesResource from '@integrations/message/providers/chatwoot/resources/InboxesResource';
import IntegrationsResource from '@integrations/message/providers/chatwoot/resources/IntegrationsResource';
import MessagesResource from '@integrations/message/providers/chatwoot/resources/MessagesResource';
import ProfileResource from '@integrations/message/providers/chatwoot/resources/ProfileResource';
import ReportsResource from '@integrations/message/providers/chatwoot/resources/ReportsResource';
import TeamsResource from '@integrations/message/providers/chatwoot/resources/TeamsResource';
import UsersResource from '@integrations/message/providers/chatwoot/resources/UsersResource';
import WebhooksResource from '@integrations/message/providers/chatwoot/resources/WebhooksResource';

export type ChatwootClientOptions = {
  baseUrl: string;
  apiAccessToken: string;
  timeoutMs?: number;
  fetchImpl?: ChatwootHttpClientOptions['fetchImpl'];
};

export default class ChatwootClient {
  public readonly http: ChatwootHttpClient;

  public readonly account: AccountResource;

  public readonly accounts: AccountsResource;

  public readonly accountUsers: AccountUsersResource;

  public readonly agents: AgentsResource;

  public readonly teams: TeamsResource;

  public readonly users: UsersResource;

  public readonly profile: ProfileResource;

  public readonly inboxes: InboxesResource;

  public readonly contacts: ContactsResource;

  public readonly contactLabels: ContactLabelsResource;

  public readonly conversations: ConversationsResource;

  public readonly conversationAssignments: ConversationAssignmentsResource;

  public readonly messages: MessagesResource;

  public readonly webhooks: WebhooksResource;

  public readonly cannedResponses: CannedResponsesResource;

  public readonly customAttributes: CustomAttributesResource;

  public readonly customFilters: CustomFiltersResource;

  public readonly integrations: IntegrationsResource;

  public readonly reports: ReportsResource;

  public readonly auditLogs: AuditLogsResource;

  public readonly automationRules: AutomationRulesResource;

  public readonly helpCenter: HelpCenterResource;

  public readonly csatSurveyPage: CsatSurveyPageResource;

  public readonly agentBots: AgentBotsResource;

  public readonly accountAgentBots: AccountAgentBotsResource;

  constructor(options: ChatwootClientOptions) {
    this.http = new ChatwootHttpClient({
      baseUrl: options.baseUrl,
      apiAccessToken: options.apiAccessToken,
      timeoutMs: options.timeoutMs,
      fetchImpl: options.fetchImpl,
    });

    this.account = new AccountResource(this.http);
    this.accounts = new AccountsResource(this.http);
    this.accountUsers = new AccountUsersResource(this.http);
    this.agents = new AgentsResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.users = new UsersResource(this.http);
    this.profile = new ProfileResource(this.http);
    this.inboxes = new InboxesResource(this.http);
    this.contacts = new ContactsResource(this.http);
    this.contactLabels = new ContactLabelsResource(this.http);
    this.conversations = new ConversationsResource(this.http);
    this.conversationAssignments = new ConversationAssignmentsResource(
      this.http,
    );
    this.messages = new MessagesResource(this.http);
    this.webhooks = new WebhooksResource(this.http);
    this.cannedResponses = new CannedResponsesResource(this.http);
    this.customAttributes = new CustomAttributesResource(this.http);
    this.customFilters = new CustomFiltersResource(this.http);
    this.integrations = new IntegrationsResource(this.http);
    this.reports = new ReportsResource(this.http);
    this.auditLogs = new AuditLogsResource(this.http);
    this.automationRules = new AutomationRulesResource(this.http);
    this.helpCenter = new HelpCenterResource(this.http);
    this.csatSurveyPage = new CsatSurveyPageResource(this.http);
    this.agentBots = new AgentBotsResource(this.http);
    this.accountAgentBots = new AccountAgentBotsResource(this.http);
  }
}
