# FEED CLIENT APP

## URLs

#### The App

**Local:** [http://localhost:3000](http://localhost:3000)
**Staging:** [https://scaler-staging.firebaseapp.com](https://scaler-staging.firebaseapp.com)
**Live:** [https://beta.tryfeed.co](https://beta.tryfeed.co)

#### The Admin Panel

**Local:** [http://localhost:3000](http://localhost:3000)
**Staging:** [https://feed-admin-staging-v2.firebaseapp.com](https://feed-admin-staging-v2.firebaseapp.com)
**Live:** [https://feed-admin-v2.firebaseapp.com](https://feed-admin-v2.firebaseapp.com)

## Initial setup

In both the `packages/admin/` `packages/app/` directories, duplicate the `.env.example`, remove the ".example", and fill in the variables.

In order to stage the site you will need a `.env.staging` file.

In order to deploy the site to production you will need a `.env.live` file.

Run `yarn` to install the packages.


## Developing

Go to the server repo (*automads-server*) and run `npm start`

#### The App

In the root of this directory, run `yarn dev` and browse to: [http://localhost:3000](http://localhost:3000).

You can also run `yarn dev:ssl` to run the app in SSL mode, then browse to: [http://localhost:3001](http://localhost:3001).

#### The Admin Panel

In the root of this directory, run `yarn dev:admin` and browse to: [http://localhost:3000](http://localhost:3000).


## Generating keys

Follow [this guide](https://letsencrypt.org/docs/certificates-for-localhost/) to generate keys

tldr; run `./bin/keyGen`


## Testing static build locally

Go to the server repo (*automads-server*) and run `npm start`

In the root of this directory, run `yarn export && yarn serve`


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


## Deleting Artist

(Not good form, but if necessary...)

In Firebase DB Console...

1. Collection = Artists
2. Find "Archform" (filter by name)
3. Set `facebook_page_id` to null
4. Delete `integrations`