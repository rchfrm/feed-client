import * as mixpanelHelpers from '@/app/helpers/mixpanelHelpers'
import * as sentryHelpers from '@/app/helpers/sentryHelpers'
import trackFacebook from '@/app/helpers/trackFacebook'

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
 * @param {boolean} fb
 */
export const track = (action, props, marketingProps = {}) => {
  const { fbProps } = marketingProps
  // * TEMP
  if (typeof action !== 'string') return
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return

  // TRACK IN MIXPANEL
  mixpanelHelpers.trackMixpanel(action, props)

  // Send off events to FB
  if (fbProps) {
    const { action, ...fbPayload } = fbProps
    trackFacebook(action, fbPayload)
  }
}

// SPECIAL TRACKING
// -----------------

// Log in
export const trackLogin = ({ authProvider, userId }) => {
  // Identify user in mixpanel
  mixpanelHelpers.mixpanelIdentify(userId)
  // Track login
  track('log_in', {
    authProvider,
  })
}

// Sign up
export const trackSignUp = ({ authProvider, userId }) => {
  // Initialise user in mixpanel
  mixpanelHelpers.mixpanelSignUp(userId)

  track('create_user', {
    authProvider,
  },
  {
    fbProps: { action: 'CreateUser' },
  })
}

// Setup PWA install tracker
export const trackPWA = () => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
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
}

export const updateTracking = (user) => {
  const { role, id } = user
  userId = id
  mixpanelHelpers.updateMixpanel(user, role)
  sentryHelpers.configureSentry(userId)
}
