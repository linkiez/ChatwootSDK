# Chatwoot SDK (TypeScript)

SDK TypeScript (ESM) para consumir a API do Chatwoot.

## Instalação (git + tag)

```bash
yarn add @linkiez/chatwoot-sdk@github:linkiez/ChatwootSDK#v1.0.0
```

## Uso

```ts
import { ChatwootClient } from '@linkiez/chatwoot-sdk';

const client = new ChatwootClient({
  baseUrl: 'https://app.chatwoot.com',
  apiAccessToken: process.env.CHATWOOT_TOKEN!,
});

const me = await client.profile.get();
```

## Scripts

- `yarn build`
- `yarn test`
- `yarn release` (semantic-release)
