# FEED CLIENT APP


## Initial setup

### ENV files

In both the `packages/admin/` `packages/app/` directories, duplicate the `.env.example` as `.env` and fill in the variables.

In order to stage the site you will need a `.env.staging` file. In order to deploy the site to production you will need a `.env.live` file. Ignore the `.env.production` file, this is auto-generated during deployment.

### Packages

Run `yarn` to install all the packages for both the App and Admin Panel.


## Running things locally

### Connecting to the API

To start development you will first need to setup a connection to the API. To do this either set the `REACT_APP_API_URL_LOCAL` variable in the `.env` file to:

```
REACT_APP_API_URL_LOCAL=https://api-dev.getfed.app/
```

Or open a new tab in the CLI, open the *automads-server*, checkout the `staging` branch, and run `npm start`. Then set the `REACT_APP_API_URL_LOCAL` variable in the `.env` file to:

```
REACT_APP_API_URL_LOCAL=http://localhost:5000/
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


## The Monorepo

There are two different Next.js setups exist within this one monorepo. The App's version is in `packages/app/` and the Admin panel is in `packages/admin/`. There is also a third directory - `packages/shared/` - that includes assets (Components, CSS, helpers etc) that are shared between the App and the Admin panel.

### Adding new packages

To add packages that will be used across all parts of the monorepo run
```
yarn add [package-name] -W
```

To add packages that will only be used on the App, run:
```
yarn workspace app add [package-name]
```

To add packages for the Admin panel run:
```
yarn workspace admin add [package-name]
```

## CSS: PostCSS and Tailwind

Both the App and the Admin panel use PostCSS and Tailwind to handle the CSS. The config files for both of these are in `shared/postcss.config.json` and `shared/tailwind.config.js`. The shared global CSS files are stored in `shared/css/` and loaded in the `_app.jsx` files of both Next.js apps.

### CSS Variables

There are CSS variables for spacing, colours, and media queries in the `shared/css/vars.css` file and in the Tailwind config. The Tailwind variables are used when using Tailwind classes and the CSS vars are used in the global stylesheets or CSS modules.

If you want to add a variable, remember to add it both the Tailwind config and `vars.css` file.

### Tailwind Cheatsheet

There's a useful Tailwind cheatsheet at [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet). This monorepo is currently using version `1.4.6`.


## Conventions and Styleguides

For notes about conventions and coding styleguides, please read the [Conventions and Styleguides document]('/docs/conventions.md).


## ESLint

The whole repo is linted by ESLint and the config file lives at the root in `.eslintrc.js`.


## Testing static builds locally

You can test the static build of the App (the version of the App that gets uploaded to Firebase). To do this, [connect to the API](#connecting-to-the-api), then run `yarn export && yarn serve`.


## Bundle analysis

To analyze the bundle size using [Next's bundle analyzer](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer), run:

`yarn analyze-bundle` or `yarn analyze-bundle:admin`


## Deploying

### Staging

To deploy _The App_ to the **staging** environment run `yarn stage`

To deploy _The Admin Panel_ to the **staging** environment run `yarn stage:admin`

To deploy _both_ to the **staging** environment run `yarn stage:both`

### Production

To deploy _The App_ to the **production** environment run `yarn deploy-production`

To deploy _The Admin Panel_ to the **production** environment run `yarn deploy-production:admin`

To deploy _both_ to the **production** environment run `yarn deploy-production:both`

## URLs

#### The App

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Staging:** [https://scaler-staging.firebaseapp.com](https://scaler-staging.firebaseapp.com)
- **Live:** [https://beta.tryfeed.co](https://beta.tryfeed.co)

#### The Admin Panel

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Staging:** [https://feed-admin-staging-v2.firebaseapp.com](https://feed-admin-staging-v2.firebaseapp.com)
- **Live:** [https://feed-admin-v2.firebaseapp.com](https://feed-admin-v2.firebaseapp.com)
