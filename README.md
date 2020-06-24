# FEED CLIENT APP

## URLs

**Local:** [http://localhost:3000](http://localhost:3000)
**Staging:** [https://scaler-staging.firebaseapp.com](https://scaler-staging.firebaseapp.com)
**Live:** [https://beta.getfed.app](https://beta.getfed.app)

## Initial setup

Run `yarn`


## Developing

Go to the server repo (*automads-server*) and run `npm start`

In the root of this directory, run `yarn dev`

### Generating keys

Follow [this guide](https://letsencrypt.org/docs/certificates-for-localhost/) to generate keys

tldr; run `./bin/keyGen`


## Testing static build locally

Go to the server repo (*automads-server*) and run `npm start`

In the root of this directory, run `yarn export && yarn serve`

## Bundle analysis

To analyze the bundle size using [Next's bundle analyzer](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer), run:

`yarn analyze-bundle`


## Deploying

To deploy to the **staging** environment run `yarn stage`

To deploy to the **production** environment run `yarn deploy-production`


## Deleting Artist

(Not good form, but if necessary...)

In Firebase DB Console...

1. Collection = Artists
2. Find "Archform"
3. Set `facebook_page_id` to null
4. Delete `integrations`