# FEED CLIENT APP

## URLs

**Local:** [http://localhost:3000](http://localhost:3000)
**Staging:** [https://scaler-staging.firebaseapp.com](https://scaler-staging.firebaseapp.com)
**Live:** [https://beta.tryfeed.co](https://beta.tryfeed.co)

## Initial setup

In both the `packages/admin/` `packages/app/` directories, duplicate all the `.env` files that end with `.example`, remove the ".example", and fill in the variables.

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

#### The App

To deploy the app to the **staging** environment run `yarn stage`

To deploy the app to the **production** environment run `yarn deploy-production`

#### The Admin Panel

To deploy the admin panel to the **staging** environment run `yarn stage:admin`

To deploy the admin panel to the **production** environment run `yarn deploy-production:admin`


## Deleting Artist

(Not good form, but if necessary...)

In Firebase DB Console...

1. Collection = Artists
2. Find "Archform"
3. Set `facebook_page_id` to null
4. Delete `integrations`