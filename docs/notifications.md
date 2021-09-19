# Notifications

Notifications are handled in the app by combining data from the notifications API plus information from the Dato CMS about how to handle each notification "topic".

## Fetching notifications

The first step is fetching notifications from the user, artist, and organization when the app first mounts. This is done in the component `packages/app/components/NotificationsHandler.jsx`. The same component also makes sure that notifications are re-refetched when the current artist is changed.

## Formatting notifications

After fetching notifications from the API the data is sent to the Zustand store at `packages/app/components/stores/notificationsStore.js` where they are formatted based on the "dictionary" defined in Dato.

Each notification has a "topic" which can have a corresponding entry in Dato that explains how to handle the notification. If there is no corresponding topic entry in Dato the notification will not be shown in the app. The notification can also be set to "hidden" in Dato, which will similarly prevent it from being displayed in the app.

Assuming the notification topic has a corresponding entry in Dato, and it is not hidden, then it will be handled by the `formatNotifications()` function in `packages/app/helpers/notificationsHelpers.js`.

This function pairs each notification with copy (for the title, button CTA, message etc) and an `onAction` function to handle the CTA button. The `onAction` function can either be a URL to another page (internal or external), an API call, or a firebase action.

## Handling notifications

Notifications can be either dismissible, actionable or hidden.

### Dismissible
These convey information such as successful payments, and profile transfers between organisations.

### Actionable
This should be restricted to notifications about issues preventing Feed from running ads. For example, failed payment or Facebook integration errors.

It will often not be possible to complete the action within the notifcation itself, either because the user needs to make a chance on another page, or in their Facebook ad account. To account for this the Feed back-end will detect the change and mark the notification is complete. The notification can then be dismissed from the front-end.

### Hidden
Notifications should be hidden if they are intended to only be sent as emails.
