# Conventions and Styleguides

## Conventions for Components

### Naming

Components should be named and used in PascalCase. If a component is only used as a child in another component, the name should include the parent component first. For example if a parent component `ConnectAccounts` has a child that is only used a child of this component, it should be named something like `ConnectAccountsChildName` (where `ChildName` is replaced by a proper description of this component).

### Directory locations

All components should be created in the `packages/[packageName]/components/` directory, where `packageName` depends on where the component is to be used (ie `app` or `admin`), or it should be `shared` if it's used in both.

There are also special types of components that have their sub-directories:

- `components/elements/` Components that are re-used across the whole site (eg: `<Button />`)
- `components/icons/` Components that are SVG icons
- `components/hooks/` Custom React hooks
- `components/stores/` Zustand stores for sharing state across the app
- `components/contexts/` React Context Providers and Consumers

### Component structure

A component file should export the component itself and nothing else. So there should not be two components exported from a single file.

Ideally, each component file should also only contain a single component. If a block of code needs to be repeated within a component then create a new file rather than defining a second component within the same file.

If you really think it would be best to define two components in a single file, then the non-exported component should be named using `SCREAMING_SNAKE_CASE`.


## Importing files

Components and other files should be [imported absolutely](https://nextjs.org/docs/advanced-features/module-path-aliases) (rather than relatively). The config for this is defined in `jsconfig.json` and the linting rules are handled at the bottom of the `.eslintrc.js` file.


## CSS conventions

We use Tailwind for most of the CSS. Sometimes Tailwind cannot handle everything (for example, single pixel transforms). In this case either use inline styles on an element, eg:

```
<div
  style={{ transform: 'translateY(-1px') }}
/>
```

Or, if the usage is more complicated, create a [Component-level CSS module](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) in the same directory as the component itself with the name: `ComponentName.module.css`.

### Global CSS

CSS files that applies to the website globally (eg font and form styling) live in `/shared/css/`. They are then imported into three parent CSS files, which are then imported in the Next.js `_app.jsx` file like this:

```
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'
```

## Using the API

Ideally, when communicating with the API, you should use the `requestWithCatch` method defined in `packages/shared/helpers/api.js`. (This is currently not used throughout the app but is slowly being adopted.)

When using this method you don't have to `.catch()` errors. Instead it will errors will resolve successfully but return an error property and can then be handled with a conditional:

```
const { res, error } = await requestWithCatch(requestType, url, payload, trackError)

if (error) {
  handleError()
  return
}

...
```

It also handles reporting server errors to Sentry.

See `packages/app/helpers/appServer.js` for examples.


## Using Dato

Some parts of the app use content from Dato CMS using graphQl queries. The queries live in `packages/app/graphQl` and the method for fetching the data lives in `packages/shared/helpers/getDatoData`.

The default method uses locally cached responses when developing and fetches from Dato when deploying. You can set `forceFetch = true` when calling `getDatoData()` to get live data when developing.

### Globally available Dato data

When the App's Next.js starts, a JSON file of global data in Dato is generated and saved in `packages/app/tempGlobalData/globalData.json`. This is then available to be imported anywhere withing the app. The query for fetching this global data lives in `packages/app/graphQl/globalDataQuery.js`


## App Copy

Any copy in that App that is longer than a few words, should be put in a file related to where that copy will go and placed in the `packages/app/copy/` directory.

It should be written in Markdown and converted into HTML using the `<MarkdownText />` component.