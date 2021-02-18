import * as Sentry from '@sentry/browser'

let sentryConfigured = false

export const configureSentry = (userId) => {
  if (sentryConfigured) return
  sentryConfigured = true
  Sentry.configureScope((scope) => {
    scope.setUser({ id: userId })
  })
}

export const fireSentryError = ({ category, action, label, description }) => {
  let message = ''
  if (description) message += `${description}\n`
  if (category) message += `Error category: ${category}\n`
  if (action) message += `Error action: ${action}\n`
  if (label) message += `Error label: ${label}\n`
  Sentry.captureException(new Error(message))
}

export const fireSentryBreadcrumb = ({ category, action, label, description }) => {
  let message = ''
  if (description) message += `${description}\n`
  if (action) message += `action: ${action}\n`
  if (label) message += `label: ${label}\n`
  Sentry.addBreadcrumb({
    category,
    message,
    level: Sentry.Severity.Info,
  })
}
