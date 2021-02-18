import * as mixpanelHelpers from '@/app/helpers/mixpanelHelpers'
import * as sentryHelpers from '@/app/helpers/sentryHelpers'

let userType = null
let userId = null

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
  mixpanelProps,
  fbTrackProps = null,
  fbCustomTrack = true,
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

  // Fire mixpanel event
  if (mixpanel) {
    const payload = {
      ...mixpanelProps,
      ...(category && { category }),
      ...(event_label && { label: event_label }),
      ...(value && { value }),
    }
    mixpanelHelpers.mixpanelTrack(action, payload)
  }
  // STOP HERE if not marketing
  if (!marketing) return false
  // Build GA payload
  // Send off event to GA
  if (ga) {
    const gaPayload = {
      event_category: category,
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

// SPECIAL TRACKING
// -----------------

// Log in
export const trackLogin = ({ method, userId }) => {
  track({
    action: 'log_in',
    category: 'log_in',
    label: method,
  })
  mixpanelHelpers.mixpanelLogin(userId)
}

// Sign up
export const trackSignUp = ({ method, userId }) => {
  track({
    action: 'create_user',
    category: 'sign_up',
    label: method,
    marketing: true,
  })
  mixpanelHelpers.mixpanelSignUp(userId)
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
  sentryHelpers.configureSentry(userId)
}
