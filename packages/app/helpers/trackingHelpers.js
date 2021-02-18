import * as mixpanelHelpers from '@/app/helpers/mixpanelHelpers'
import * as sentryHelpers from '@/app/helpers/sentryHelpers'
import { trackGoogle } from '@/app/helpers/trackGoogleHelpers'
import trackFacebook from '@/app/helpers/trackFacebook'

let userType = null
let userId = null

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
export const track = (action, props, {
  gaProps = null,
  fbProps = null,
}) => {
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return

  // Fire mixpanel event
  mixpanelHelpers.trackMixpanel(action, props)

  // HANDLE GOOGLE
  if (gaProps) {
    const { action, ...gaPayload } = gaProps
    trackGoogle(action, gaPayload)
  }
  // Send off events to FB
  if (fbProps) {
    const { action, ...fbProps } = gaProps
    trackFacebook(action, fbProps)
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

// INIT
// ----------
export const setupTracking = () => {
  // Setup mixpanel
  mixpanelHelpers.initMixpanel()
}

export const updateTracking = (user) => {
  const { role, id } = user
  userId = id
  userRole = role
  mixpanelHelpers.updateMixpanel(user)
  sentryHelpers.configureSentry(userId)
}
