import * as Sentry from '@sentry/browser'

// SENTRY
// ------------------------------
const configureSentry = (id) => {
  Sentry.configureScope((scope) => {
    scope.setUser({ id })
  })
}

let userType = null
let userId = null
export const setUserType = (user) => {
  const { role, id } = user
  userId = id
  userType = role
  // Set user ID into sentry
  configureSentry(id)
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


// GOOGLE
// ------------------------------
let gtagEnabled = false
export const enableGtag = () => {
  gtagEnabled = true
}

const gaCrossDomains = [
  'tryfeed.co',
  'blog.tryfeed.co',
  'beta.tryfeed.co',
  'staging.tryfeed.co',
  'getfed.app',
  'beta.tryfeed.co',
  'blog.getfed.app',
]
export const gaCrossDomainsString = gaCrossDomains.reduce((str, url, index) => {
  if (index === 0) return `${str}'${url}'`
  const suffix = index === gaCrossDomains.length - 1 ? ']' : ''
  return `${str}, '${url}'${suffix}`
}, '[')

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gtagPageView = (url, gaId) => {
  const { gtag } = window
  if (!gtag) return
  gtag('config', gaId, {
    page_path: url,
    linker: {
      domains: gaCrossDomains,
    },
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const fireGtagEvent = (payload) => {
  const {
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
    transportType,
    eventCallback,
    description = '',
  } = payload

  // Stop here if sysadmin
  if (userType === 'admin') return

  const newLabel = description ? `${description} ${eventLabel}` : eventLabel

  const { gtag } = window

  if (!gtag || !gtagEnabled) {
    // Log GA INFO
    console.info('GA SEND', payload)
    // Run callback (if present)
    if (typeof eventCallback === 'function') eventCallback()
    return
  }

  gtag('event', eventAction, {
    event_category: eventCategory,
    event_label: newLabel,
    value: eventValue,
    transport_type: transportType,
    event_callback: eventCallback,
  })
}


// FACEBOOK
// --------------------------
export const fireFBEvent = ({ label, location }) => {
  const { fbq } = window
  if (!fbq) {
    console.info('FB SEND', 'trackCustom', `label: ${label}`, { location })
    return
  }
  fbq('trackCustom', label, { location })
}


// HELPERS
// --------------------------
/**
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {string} description
 * @param {string} location
 * @param {string} value
 * @param {boolean} breadcrumb
 * @param {boolean} error
 * @param {boolean} ga
 * @param {boolean} fb
 */
export const track = ({
  category,
  action,
  label,
  description,
  location = '',
  value,
  breadcrumb = false,
  error = false,
  ga = true,
  fb = false,
}) => {
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return

  let eventLabel = label
  if (description) {
    eventLabel = `${eventLabel}, ${description}`
  }
  // Build GA payload
  const gaPayload = {
    eventCategory: error ? 'Error' : category,
    eventAction: action,
    eventLabel,
    eventValue: value,
  }
  // Send off event to GA
  if (ga) {
    fireGtagEvent(gaPayload)
  }
  // Send off events to FB
  if (fb) {
    fireFBEvent({ label, location })
  }
  // Sentry breadcrum
  if (breadcrumb) {
    fireSentryBreadcrumb({ category, action, label, description })
  }
  // If error, fire in sentry also
  if (error) {
    fireSentryError({ category, action, label, description })
  }
}


// Setup PWA install tracker
export const trackPWA = () => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
  window.addEventListener('beforeinstallprompt', (event) => {
    event.userChoice.then((result) => {
      if (result.outcome === 'dismissed') {
        track({
          category: 'PWA',
          action: 'Declined PWA install',
          label: `userId: ${userId}`,
        })
      } else {
        track({
          category: 'PWA',
          action: 'Installed PWA',
          label: `userId: ${userId}`,
        })
      }
    })
  })
}

// Tracks click and then redirects page
/**
 * @param {string} url
 * @param {string} label
 * @param {string} category
 * @param {boolean} ga
 * @param {boolean} fb
 */
export const trackOutbound = ({
  url,
  label,
  category = 'outbound',
  ga = true,
  fb = true,
}) => {
  // Require URL
  if (!url) {
    console.error('Track outbound requires a URL')
  }
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
  // Send off event to GA
  const gaPayload = {
    eventCategory: category,
    eventAction: 'click',
    eventLabel: label || url,
    transportType: 'beacon',
    eventCallback: () => { document.location = url },
  }
  // Send off events to FB
  if (fb) {
    fireFBEvent({ label: category, location: label })
  }
  if (ga) {
    fireGtagEvent(gaPayload)
  }
}
