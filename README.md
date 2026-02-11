# Respawn

> Build it. Break it. Respawn. Shape it.

> We can rebuild it. We have the technology.

Respawn is a fast, lightweight DOM runtime built around explicit creation and re-creation.

## Use
1. npm install
2. Import module in your app e.g.

```js
import Spawn, { Mount } from '@nurvus/respawn';

const el = Spawn('Your Respawn is ready.');
Mount(document.body, el);
```

## Contribute
1. `npm install` Install
2. `npm run demo` Demo
3. `npm run playground` Inspiration

## Fonts (Inter)
- Inter is bundled locally via `@fontsource/inter` (no Google Fonts).
- If you change webpack config and see a CSS loader error like `Unexpected character '@'`, restart the dev server (`npm run demo` / `npm run playground`).
