import * as mixpanelHelpers from '@/landing/helpers/mixpanelHelpers'

const isDevelopment = process.env.NODE_ENV === 'development'

// FACEBOOK
// --------------------------
export const fireFBEvent = (action, payload, customTrack) => {
  const { fbq } = window
  const trackType = customTrack ? 'trackCustom' : 'track'
  if (isDevelopment) {
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
  location,
  value,
  mixpanelProps,
  fbTrackProps = null,
  fbCustomTrack = true,
  error = false,
  marketing = false,
  mixpanel = true,
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
      ...(location && { location }),
      ...(category && { category }),
      ...(event_label && { label: event_label }),
      ...(value && { value }),
      ...(error && { error: true }),
    }
    mixpanelHelpers.mixpanelTrack(action, payload)
  }
  // STOP HERE if not marketing
  if (!marketing) return false
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


// INIT
// ----------
export const setupTracking = () => {
  // Setup mixpanel
  mixpanelHelpers.initMixpanel()
}
