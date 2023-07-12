import * as Sentry from '@sentry/browser'
import { Breadcrumb } from '@sentry/browser'

let sentryConfigured = false

export const configureSentry = (userId: string): void => {
  if (sentryConfigured) return
  sentryConfigured = true
  Sentry.configureScope((scope) => {
    scope.setUser({ id: userId })
  })
}

interface SentryError {
  action?: string,
  category?: string,
  description?: string,
  label?: string,
}
export const fireSentryError = (error: SentryError): void => {
  const {
    action,
    category,
    description,
    label,
  } = error
  let message = ''
  if (description) message += `${description}\n`
  if (category) message += `Error category: ${category}\n`
  if (action) message += `Error action: ${action}\n`
  if (label) message += `Error label: ${label}\n`
  Sentry.captureException(new Error(message))
}

interface SentryBreadcrumb {
  action?: string,
  category: string,
  description?: string,
  label?: string,
}
export const fireSentryBreadcrumb = (breadcrumb: SentryBreadcrumb): void => {
  const {
    action,
    category,
    description,
    label,
  } = breadcrumb
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
