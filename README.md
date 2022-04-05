# FEED CLIENT APP

## Initial setup

### ENV files

In both all of `packages/admin/`, `packages/app/` and `packages/landing`, duplicate the `.env.example` as `.env` and fill in the variables.

In order to stage the site you will need a `.env.staging` file. In order to deploy the site to production you will need a `.env.live` file. Ignore the `.env.production` file, this is auto-generated during deployment.

There is currently no `.env` file required for `packages/deep-links/`.

### Packages

Run `yarn` to install all the packages.

## Running things locally

### Connecting to the API

To start development you will first need to set up a connection to the API. To do this either set the `REACT_APP_API_URL` variable in the `.env` file to:

```
REACT_APP_API_URL=https://api-dev.tryfeed.co/
```

Or open a new tab in the CLI, open the *automads-server*, checkout the `staging` branch, and run `npm start`. Then set the `REACT_APP_API_URL` variable in the `.env` file to:

```
REACT_APP_API_URL=http://localhost:5000/
```

### Developing the App

In the root of this directory, run:
```
yarn dev
```
and open [http://localhost:3000](http://localhost:3000).

Alternatively, you can also to start the app in SSL mode, run:
```
yarn dev:ssl
```
Then browse to: [https://localhost:3001](https://localhost:3001). This is necessary if you are going to be doing any work that involves Facebook redirects (eg logging in or signing up with a Facebook account). *Before running the app in SSL mode, you will first need to generate some certificates locally*.

### Generating local SSL certificates.

Before running either app in SSL mode you will first need to generate local certificates. To do this, run
```
./bin/keyGen
```

### Developing the Admin Panel

In the root of this directory, run `yarn dev:admin` and browse to: [http://localhost:3000](http://localhost:3000).

### Developing the Landing Page

In the root of this directory, run `yarn dev:landing` and browse to: [http://localhost:4000](http://localhost:4000).

### Developing the deep link redirect pages

In the root of this directory, run `yarn dev:deep-links` and browse to: [http://localhost:5000/instagram/feed.hq](http://localhost:5000/instagram/feed.hq).

## The Monorepo

There are different Next.js setups for each of the packages within this one monorepo. There is also a third directory - `packages/shared/` - that includes assets (Components, CSS, helpers etc) that are shared between all packages.

`packages/deep-links` does not currently use Next.js.

### Adding new packages

To add NPM modules that will be used across all parts of the monorepo run
```
yarn add [module-name] -W
```

To add NPM modules that will only be used in one package, run:
```
yarn workspace [package-name] add [module-name]
```

## CSS: PostCSS and Tailwind

The App, Admin panel and Landing page use PostCSS and Tailwind to handle the CSS. The config files for both of these are in `shared/postcss.config.json` and `shared/tailwind.config.js`. The shared global CSS files are stored in `shared/css/` and loaded in the `_app.jsx` files of both Next.js apps.

### CSS Variables

There are CSS variables for spacing, colours, and media queries in the `shared/css/vars.css` file and in the Tailwind config. The Tailwind variables are used when using Tailwind classes and the CSS vars are used in the global stylesheets or CSS modules.

If you want to add a variable, remember to add it both the Tailwind config and `vars.css` file.

### Tailwind Cheatsheet

There's a useful Tailwind cheatsheet at [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet). This monorepo is currently using version `1.4.6`.

## Conventions and Styleguides

For notes about conventions and coding styleguides, please read the [Conventions and Styleguides document](/docs/conventions.md).

## ESLint

The whole repo is linted by ESLint and the config file lives at the root in `.eslintrc.js`.

## Testing static builds locally

You can test the static build of the App (the version of the App that gets uploaded to Firebase). To do this, [connect to the API](#connecting-to-the-api), then run `yarn export && yarn serve`.

## Bundle analysis

To analyze the bundle size using [Next's bundle analyzer](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer), run:

`yarn analyze-bundle` or `yarn analyze-bundle:admin`

## Deploying

### Staging

Before staging, merge the `dev` branch into the `staging` branch. Then...

To deploy _The App_ to the **staging** environment run `yarn stage`

To deploy _The Admin Panel_ to the **staging** environment run `yarn stage:admin`

To deploy _The Landing Page_ to the **staging** environment run `yarn stage:landing`

To deploy _The Deep Links_ to the **staging** environment run `yarn stage:deep-links`

To deploy _all_ to the **staging** environment run `yarn stage:all`

### Production

Before deploying to production, merge the `dev` branch into the `production` branch. Then...

To deploy _The App_ to the **production** environment run `yarn deploy-production`

To deploy _The Admin Panel_ to the **production** environment run `yarn deploy-production:admin`

To deploy _The Landing Page_ to the **production** environment run `yarn deploy-production:landing`

To deploy _The Deep Links_ to the **production** environment run `yarn deploy-production:deep-links`

To deploy _all_ to the **production** environment run `yarn deploy-production:all`

## URLs

#### The App

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Staging:** [https://archform-1-dev.firebaseapp.com](https://archform-1-dev.firebaseapp.com)
- **Live:** [https://beta.tryfeed.co](https://beta.tryfeed.co)

#### The Admin Panel

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Staging:** [https://feed-admin-staging-v2.firebaseapp.com](https://feed-admin-staging-v2.firebaseapp.com)
- **Live:** [https://feed-admin-v2.firebaseapp.com](https://feed-admin-v2.firebaseapp.com)

#### The Landing Page

- **Local:** [http://localhost:4000](http://localhost:4000)
- **Staging:** [feed-landing--staging.web.app](feed-landing--staging.web.app)
- **Live:** [feed-landing.web.app](feed-landing.web.app)

#### The Deep Links

- **Local:** [http://localhost:5000](http://localhost:5000)
- **Staging:** [deep-links-staging.web.app](deep-links-staging.web.app)
- **Live:** [deep-links-prod.web.app](deep-links-prod.web.app)

## Feature descriptions

Some features have more in-depth descriptions. There is currently documentation for:

- [The Signup and Login flow](/docs/signupLoginFlow.md)
- [Global state](/docs/globalState.md)
- [The BasePage component](/docs/basePage.md)
- [Notifications](/docs/notifications.md)
