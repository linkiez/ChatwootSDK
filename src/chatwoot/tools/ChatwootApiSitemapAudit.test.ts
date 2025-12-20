import {
  auditChatwootApiCoverage,
  extractChatwootApiResourcesFromSitemapXml,
  extractPlanCoverageMatrix,
} from './ChatwootApiSitemapAudit';

describe('ChatwootApiSitemapAudit', () => {
  describe('extractChatwootApiResourcesFromSitemapXml', () => {
    it('should extract unique resources from sitemap xml', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://developers.chatwoot.com/api-reference/accounts/list-all-accounts</loc></url>
  <url><loc>https://developers.chatwoot.com/api-reference/account-users/list-all-users</loc></url>
  <url><loc>https://developers.chatwoot.com/api-reference/accounts/create-account</loc></url>
  <url><loc>https://developers.chatwoot.com/api-reference/introduction</loc></url>
  <url><loc>https://developers.chatwoot.com/docs/self-hosted</loc></url>
</urlset>`;

      expect(extractChatwootApiResourcesFromSitemapXml(xml)).toEqual([
        'account-users',
        'accounts',
      ]);
    });
  });

  describe('extractPlanCoverageMatrix', () => {
    it('should parse resource to module mappings from the plan matrix', () => {
      const markdown = `### Application APIs

- [x] \`account\` → \`resources/AccountResource.ts\`
- [x] \`contacts-api\` → \`client-api/resources/ContactsApiResource.ts\`
`;

      expect(Array.from(extractPlanCoverageMatrix(markdown).entries())).toEqual(
        [
          ['account', 'resources/AccountResource.ts'],
          ['contacts-api', 'client-api/resources/ContactsApiResource.ts'],
        ],
      );
    });
  });

  describe('auditChatwootApiCoverage', () => {
    it('should report resources present in sitemap but missing from plan', async () => {
      const sitemapResources = ['accounts', 'account-users', 'new-resource'];
      const planMatrix = new Map<string, string>([
        ['accounts', 'resources/AccountsResource.ts'],
        ['account-users', 'resources/AccountUsersResource.ts'],
      ]);

      const result = await auditChatwootApiCoverage({
        sitemapResources,
        planCoverageMatrix: planMatrix,
        fileExists: async () => true,
      });

      expect(result.missingFromPlan).toEqual(['new-resource']);
      expect(result.missingFiles).toEqual([]);
    });

    it('should report mapped files that do not exist', async () => {
      const sitemapResources = ['accounts'];
      const planMatrix = new Map<string, string>([
        ['accounts', 'resources/AccountsResource.ts'],
      ]);

      const result = await auditChatwootApiCoverage({
        sitemapResources,
        planCoverageMatrix: planMatrix,
        fileExists: async (path) => path.endsWith('DOES_NOT_EXIST.ts'),
      });

      expect(result.missingFromPlan).toEqual([]);
      expect(result.missingFiles).toEqual([
        {
          mappingPath: 'resources/AccountsResource.ts',
          resolvedPath:
            'src/integrations/message/providers/chatwoot/resources/AccountsResource.ts',
          resource: 'accounts',
        },
      ]);
    });
  });
});
