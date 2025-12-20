import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

export type ChatwootPlanCoverageMatrix = Map<string, string>;

export type AuditMissingFile = {
  resource: string;
  mappingPath: string;
  resolvedPath: string;
};

export type AuditResult = {
  sitemapResources: string[];
  planResources: string[];
  missingFromPlan: string[];
  missingFiles: AuditMissingFile[];
};

export type FileExists = (absoluteOrRelativePath: string) => Promise<boolean>;

export function extractChatwootApiResourcesFromSitemapXml(
  xml: string,
): string[] {
  const resources = new Set<string>();
  const ignoredResources = new Set<string>(['introduction']);

  const regex =
    /https:\/\/developers\.chatwoot\.com\/api-reference\/([^/<\s]+)(?:\/|<)/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(xml)) !== null) {
    const resource = match[1];
    if (!resource) continue;
    if (ignoredResources.has(resource)) continue;
    resources.add(resource);
  }

  return Array.from(resources).sort();
}

export function extractPlanCoverageMatrix(
  markdown: string,
): ChatwootPlanCoverageMatrix {
  const matrix = new Map<string, string>();

  const lines = markdown.split(/\r?\n/);
  const lineRegex = /^- \[[ x~]\] `([^`]+)`\s+→\s+`([^`]+)`\s*$/;

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (!match) continue;

    const resource = match[1].trim();
    const mappingPath = match[2].trim();

    if (!resource || !mappingPath) continue;

    if (matrix.has(resource) && matrix.get(resource) !== mappingPath) {
      throw new Error(
        `Duplicate resource mapping for '${resource}': '${matrix.get(resource)}' vs '${mappingPath}'`,
      );
    }

    matrix.set(resource, mappingPath);
  }

  return matrix;
}

function defaultFileExists(): FileExists {
  return async (absolutePath: string) => {
    try {
      await access(absolutePath);
      return true;
    } catch {
      return false;
    }
  };
}

export async function auditChatwootApiCoverage(params: {
  sitemapResources: string[];
  planCoverageMatrix: ChatwootPlanCoverageMatrix;
  projectRoot?: string;
  fileExists?: FileExists;
}): Promise<AuditResult> {
  const projectRoot = params.projectRoot ?? process.cwd();
  const fileExists = params.fileExists ?? defaultFileExists();

  const sitemapResources = Array.from(new Set(params.sitemapResources)).sort();
  const planResources = Array.from(params.planCoverageMatrix.keys()).sort();

  const missingFromPlan = sitemapResources.filter(
    (resource) => !params.planCoverageMatrix.has(resource),
  );

  const missingFiles: AuditMissingFile[] = [];

  for (const [resource, mappingPath] of params.planCoverageMatrix.entries()) {
    const resolvedPath = resolve(
      projectRoot,
      'src/integrations/message/providers/chatwoot',
      mappingPath,
    );

    const exists = await fileExists(resolvedPath);
    if (!exists) {
      missingFiles.push({
        resource,
        mappingPath,
        resolvedPath: resolvedPath
          .split(projectRoot)
          .join('')
          .replace(/^\//, ''),
      });
    }
  }

  return {
    sitemapResources,
    planResources,
    missingFromPlan,
    missingFiles,
  };
}

export async function runChatwootApiSitemapAudit(params: {
  planMarkdown: string;
  sitemapXml: string;
  projectRoot?: string;
}): Promise<AuditResult> {
  const sitemapResources = extractChatwootApiResourcesFromSitemapXml(
    params.sitemapXml,
  );
  const planCoverageMatrix = extractPlanCoverageMatrix(params.planMarkdown);

  return auditChatwootApiCoverage({
    sitemapResources,
    planCoverageMatrix,
    projectRoot: params.projectRoot,
  });
}
