# Global State

There are three global [React Context](https://reactjs.org/docs/context.html) state holders in the app: one for the `auth` state (`AuthContext`), one for the `user` state (`UserContext`), and one for the `artist` state (`ArtistContext`). These are all set when the user has successfully signed up or logged in.

The `AuthContext` is wrapped around everything in the app and exists as the top node in the `_app.jsx` file. The `UserContext` and `ArtistContext` are inserted in the `<AppContents />` component and wrapped around the content of every page.

## The Auth context

This holds information about:

- what firebase authentication method ("provider") the user uses (eg, Facebook or password),
- any errors with authenticating the user,
- any missing permission scopes from Facebook

## The User context

This holds information about the user such as:

- The user ID
- Contact details
- Organizations the user belongs to
- Artists the user controls

## The Artist context

This holds information about the current active artist and will update every time the user selects a new active artist. Important information includes:

- The artist ID
- The currency and budget information associated with the artist
- Whether the artist is a musician