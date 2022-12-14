import * as sentryHelpers from '@/app/helpers/sentryHelpers'
import TagManager from 'react-gtm-module'
import * as mixpanelHelpers from '~/helpers/mixpanelHelpers'
import { trackGooglePageView, trackGoogleUserCreated } from '~/helpers/trackGoogleHelpers'
import { mixpanelPageView } from '~/helpers/mixpanelHelpers'

let userId = null

// HELPERS
// --------------------------
/**
 * @param {string} action
 * @param props
 */
export const track = (action, props) => {
  // * TEMP
  if (typeof action !== 'string') return
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (! isBrowser) return

  // TRACK IN MIXPANEL
  mixpanelHelpers.trackMixpanel(action, props)
}

// SPECIAL TRACKING
// -----------------

// Page view
export const trackPageView = (pathname) => {
  trackGooglePageView(pathname)
  mixpanelPageView(pathname)
}

// Log in
export const trackLogin = ({ authProvider, userId }) => {
  // Identify user in mixpanel
  mixpanelHelpers.mixpanelIdentify(userId)
  // Track login
  track('log_in', { authProvider })
}

// Sign up
export const trackSignUp = ({ authProvider, userId }) => {
  // Initialise user in mixpanel
  mixpanelHelpers.mixpanelSignUp(userId)

  track('create_user', { authProvider })
  trackGoogleUserCreated()
}

// Setup PWA install tracker
export const trackPWA = () => {
  const isBrowser = typeof window !== 'undefined'
  if (! isBrowser) return
  window.addEventListener('beforeinstallprompt', (event) => {
    event.userChoice.then((result) => {
      track(result.outcome === 'dismissed' ? 'decline_install_pwa' : 'install_pwa')
    })
  })
}

// INIT
// ----------
export const setupTracking = (disabled) => {
  // Setup mixpanel
  mixpanelHelpers.initMixpanel(disabled)
  // Setup Google Tag Manager
  TagManager.initialize({
    gtmId: process.env.gtm_id,
    auth: process.env.gtm_auth,
    preview: process.env.gtm_preview,
  })
}

export const updateTracking = (user) => {
  const { role, id } = user
  userId = id
  mixpanelHelpers.updateMixpanel(user, role)
  sentryHelpers.configureSentry(userId)
}
