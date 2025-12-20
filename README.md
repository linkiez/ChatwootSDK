# Chatwoot SDK (TypeScript, ESM)

TypeScript SDK (ESM) to consume the Chatwoot API.

## Highlights

- ESM-first package with TypeScript typings
- Typed resources for Chatwoot endpoints (Application API + Client API)
- Test suite (Jest) to validate request URLs/methods/headers

## Requirements

- Node.js (recommended: Node 20+)
- This package is ESM (`"type": "module"`)

## Installation

### From npm

```bash
yarn add @linkiez/chatwoot-sdk
```

### From GitHub (git + tag)

```bash
yarn add @linkiez/chatwoot-sdk@github:linkiez/ChatwootSDK#v1.0.0
```

## Usage

```ts
import { ChatwootClient } from '@linkiez/chatwoot-sdk';

const client = new ChatwootClient({
  baseUrl: 'https://app.chatwoot.com',
  apiAccessToken: process.env.CHATWOOT_TOKEN!,
});

const me = await client.profile.get();
```

## Scripts

- `yarn test`
- `yarn build`
- `yarn typecheck`
- `yarn release` (semantic-release)

## Release workflow

Releases are automated via `semantic-release` on pushes to:

- `main` (stable)
- `beta` (prerelease)
- `alpha` (prerelease)

The GitHub Actions workflow runs build + release and publishes to npm.
