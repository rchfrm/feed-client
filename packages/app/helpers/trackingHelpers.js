import * as Sentry from '@sentry/browser'
import * as mixpanelHelpers from '@/app/helpers/mixpanelHelpers'

let userType = null
let userId = null

// SENTRY
// ------------------------------
let sentryConfigured = false

const configureSentry = (userId) => {
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
  if (userType === 'admin') {
    // Log GA INFO
    console.info('GA SEND', payload)
  }

  const { gtag } = window

  if (!gtag || !gtagEnabled) {
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
  if (userType === 'admin') {
    console.group()
    console.info('FB SEND')
    console.info('trackType', trackType)
    console.info('action', action)
    console.info(payload)
    console.groupEnd()
    return
  }
  if (!fbq) return
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
  category,
  description,
  value,
  fbTrackProps = null,
  fbCustomTrack = true,
  error = false,
  breadcrumb = false,
  marketing = false,
  mixpanel = true,
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
  // Sentry breadcrumb
  // STOP HERE
  if (breadcrumb) {
    fireSentryBreadcrumb({ category, action, label, description })
    return
  }
  // If error, fire in sentry
  if (error) {
    fireSentryError({ category, action, label, description })
  }
  // Fire mixpanel event
  if (mixpanel) {
    const payload = {
      ...(category && { category }),
      ...(event_label && { label: event_label }),
      ...(value && { value }),
      ...(error && { error: true }),
    }
    mixpanelHelpers.mixpanelTrack(action, payload)
  }
  // STOP HERE if not marketing
  if (!marketing) return false
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
      ...(value && { value }),
    }
    fireFBEvent(action, fbPayload, fbCustomTrack)
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
          action: 'decline_install_pwa',
          category: 'pwa',
        })
      } else {
        track({
          action: 'install_pwa',
          category: 'pwa',
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


// INIT
// ----------
export const setupTracking = () => {
  // Setup mixpanel
  mixpanelHelpers.initMixpanel()
}

export const updateTracking = (user) => {
  const { role, id } = user
  userId = id
  userType = role
  mixpanelHelpers.updateMixpanel(user)
  if (sentryConfigured) return
  configureSentry(userId)
}
