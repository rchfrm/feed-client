import * as Sentry from '@sentry/browser'

let userType = null
export const setUserType = (user) => {
  const { artists } = user
  if (!artists.length) return
  const { role } = artists[0]
  userType = role
}

export const fireGAEvent = (payload) => {
  // Stop here if sysadmin
  if (userType === 'sysadmin') return
  const { ga } = window
  if (!ga) {
    console.info('GA SEND', payload)
    return
  }
  ga('send', payload)
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


/**
 * @param {string} hitType
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {string} description
 * @param {boolean} breadcrumb
 * @param {boolean} error
 */
export const track = ({
  hitType = 'event',
  category,
  action,
  label,
  description,
  breadcrumb = false,
  error = false,
  ga = true,
}) => {
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
  // Build GA payload
  const gaPayload = {
    hitType,
    eventCategory: error ? 'Error' : category,
    eventAction: action,
    eventLabel: label,
  }
  // Send off event to GA
  if (ga) {
    fireGAEvent(gaPayload)
  }
  if (breadcrumb) {
    fireSentryBreadcrumb({ category, action, label, description })
  }
  // If error, fire in sentry also
  if (error) {
    fireSentryError({ category, action, label, description })
  }
}
