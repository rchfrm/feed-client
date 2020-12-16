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
export const fireGtagEvent = (action, payload) => {
  const {
    event_callback,
  } = payload

  // Stop here if sysadmin
  if (userType === 'admin') return

  const { gtag } = window

  if (!gtag || !gtagEnabled) {
    // Log GA INFO
    console.info('GA SEND', payload)
    // Run callback (if present)
    if (typeof event_callback === 'function') event_callback()
    return
  }
  // PAYLOAD
  // {
  //   'event_category': <category>,
  //   'event_label': <label>,
  //   'value': <value>
  // }
  gtag('event', action, payload)
}


// FACEBOOK
// --------------------------
export const fireFBEvent = (action, payload, customTrack) => {
  const { fbq } = window
  const trackType = customTrack ? 'trackCustom' : 'track'
  if (!fbq) {
    console.info('FB SEND', trackType, `action: ${action}`, { payload })
    return
  }
  fbq(trackType, action, payload)
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
  action,
  label,
  location = '',
  category,
  description,
  value,
  fbTrackProps = null,
  fbCustomTrack = true,
  error = false,
  breadcrumb = false,
  ga = true,
  fb = true,
}) => {
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return

  let event_label = label
  if (description) {
    event_label = `${event_label}, ${description}`
  }
  // Sentry breadcrum
  // STOP HERE
  if (breadcrumb) {
    fireSentryBreadcrumb({ category, action, label, description })
    return
  }
  // Build GA payload
  // Send off event to GA
  if (ga) {
    const gaPayload = {
      event_category: error ? 'Error' : category,
      event_label,
      event_value: value,
    }
    fireGtagEvent(action, gaPayload)
  }
  // Send off events to FB
  if (fb) {
    const fbPayload = fbTrackProps || {
      ...(category && { category }),
      ...(event_label && { label: event_label }),
      ...(location && { location }),
    }
    fireFBEvent(action, fbPayload, fbCustomTrack)
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
          action: 'DeclinedPwaInstall',
          category: 'PWA',
          label: `userId: ${userId}`,
        })
      } else {
        track({
          action: 'InstalledPwa',
          category: 'PWA',
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
    event_category: category,
    event_label: label || url,
    transport_type: 'beacon',
    event_callback: () => { document.location = url },
  }
  const fbPayload = {
    category,
    label: label || url,
  }
  // Send off events to FB
  if (fb) {
    fireFBEvent('OutboundClick', fbPayload)
  }
  if (ga) {
    fireGtagEvent('OutboundClick', gaPayload)
  }
}
