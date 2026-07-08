# CMS-Agnostic Astro Frontend

Demo frontend built with Astro for exploring CMS-agnostic editorial routing.

Astro is excellent for file-based routes, but CMS-driven sites often need to handle
legacy paths, arbitrary URL formats, query variants, content-source selection, and
template selection at request time. This project uses a catch-all Astro page and a
small route engine to resolve those concerns before rendering.

## How It Works

All dynamic requests are captured by:

```text
src/pages/[...path].astro
```

That page delegates request resolution to the route engine:

```text
src/routing/index.js
```

The engine lifecycle currently does this:

1. Matches the request URL against declarative route definitions.
2. Derives content params from the matched path, query params, or static values.
3. Fetches server-side content from the configured content source.
4. Selects the template to render.
5. Returns a `routeContext` consumed by the Astro template.

The goal is to keep editorial routes declarative and ordered, while rendering
remains CMS-agnostic.

## Key Files

```text
src/pages/[...path].astro              Catch-all page that renders resolved templates
src/routing/routes.js                  Declarative route definitions
src/routing/router.js                  Route engine
src/routing/routeContext.js            Per-request route context factory
src/routing/lifecycle/deriveParams.js  Builds content params
src/routing/lifecycle/fetchContent.js  Fetches content server-side
src/routing/lifecycle/selectTemplate.js Selects template variants
src/routing/errors.js                  Route engine error classes
src/content-sources/                   CMS/content-source adapters
src/content-sources/resolver/          Dynamic content-source loader
src/templates/                         Render templates
```

## Route Definitions

Routes are declared in order. More specific routes should be placed before more
general routes.

Each route can define:

- `pattern`: URLPattern-compatible pathname pattern.
- `urlParams`: optional query constraints.
- `content.source`: content source adapter.
- `content.params`: how to derive params for the source.
- `templates.default`: default template key.
- `templates.variants`: conditional template selection based on content fields.

## Content Sources

Content retrieval lives under:

```text
src/content-sources/
```

Each content source is an adapter that hides CMS-specific fetch logic behind a
common shape. Routes reference sources by name:

```js
content: {
  source: "content-api",
  params: [
    { key: "slug", from: "pattern", value: "slug" },
  ],
}
```

The resolver in `src/content-sources/resolver/content-resolver.js` loads the
matching source module dynamically and calls its `fetch(params)` method.

This keeps route definitions and templates independent from the CMS API details.

## routeContext

Templates receive a single `routeContext` object instead of isolated props. View
models can derive template-specific data from that shared context, keeping values
for `Head` and `Body` consistent without duplicating mapping logic.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

This project requires Node `>=24`.
