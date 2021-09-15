# The Signup and Login flow

## Overview

We use Firebase auth to handle authentication on the app and the admin panel. At the moment the current authentication methods that we support are [Facebook](https://firebase.google.com/docs/auth/web/facebook-login) and [password](https://firebase.google.com/docs/auth/web/password-auth).

Once signed up or logged in via Firebase, the user is paired with a user entry in our database.

All accounts, whichever authentication method is used, will have an email address associated with the Firebase user and the user in our database.

## Specifications

Before following the code, it's worth reading the specifications (which include flowcharts). They can be found here:

- [Signing Up](https://docs.google.com/document/d/1dC0-DZuOrlmEiDEmSfQMpAaZ7iiGCGvmJx4zKTzpxG0)
- [Logging in](https://docs.google.com/document/d/1X2aib9EmlzfoqhgYKhsERZ5oMot7dAigf9rtOB2KAGQ/edit)


## The components for handling authentication

> N.B. The notes here will only describe the app. The way authentication is handled in the Admin site is similar but simpler.

Access to the client is controlled in two ways. The initial check of whether a user is signed in, or arriving to the site from an authorising redirect via Facebook, is handled in the `<InitUser />` (`packages/app/components/InitUser.jsx`) component which is a child of the `<Main />` (`packages/app/components/Main.jsx`) component, which is imported in the `_app.jsx` file and is therefore a parent of every page.

A user can either be signed in (using Firebase's local storage method), signed out (no authentication status), or returning from a redirect from Facebook with information about the authentication status. All three of these states are handled in the `InitUser` component. There are a lot steps to this process and the code is heavily commented to guide you through it, so it's worth trying to follow these.

Some of the logic lives in some custom hooks, so it's worth following the code there. There are hooks for logging in and signing up and they are defined in `packages/app/components/hooks/useLogin.js` and `packages/app/components/hooks/useSignup.js` respectively.

### Handling Facebook redirects

Facebook redirect to the app happen when logging in or signing up. Firebase is able to read the state of the redirect and the client uses the payload from this to decide what to do next. All the logic for this is handled in the `useAsyncEffect` in `<InitUser />` when the app first mounts.

### Logging in and signing up with email

When logging in or signing up with email the app has already mounted, which means all the logic that runs on mount in `<InitUser />` has finished. So rather than living in that component, the logic exists in the components that contain the forms: `<LoginEmailForm />` and `<SignupEmailForm />`.

### Continuously checking authentication

Lastly, whenever a new page is mounted, the authentication status is queried to ensure the user is still logged in. If it's detected that they are no longer signed in, the user will be kicked back to the login page. This is handled by wrapping the content of every page in a higher order component called `testPageReady` (`packages/shared/components/hoc/testPageReady.jsx`) and is used like this:

```
const Page = () => {
  return <PageContent />
}

export default testPageReady('app')(Page)
```

...where 'app' is the package (`app` vs `admin`), and `Page` is the content of the page.

## The components for handling auth state

There are three global state components that are relevant for the login/signup flow: the `auth` state (`AuthContext`) the `user` state (`UserContext`), and the `artist` state (`ArtistContext`)

You can read more about them in the [global state doc](/docs/globalState.md).

## Using Firebase

All the firebase auth methods that we use are defined in `packages/shared/helpers/firebaseHelpers.js`.

Read more at the [Firebase auth docs](https://firebase.google.com/docs/auth/web/start).