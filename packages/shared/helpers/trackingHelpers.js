import * as sentryHelpers from '@/app/helpers/sentryHelpers'
import * as mixpanelHelpers from '~/helpers/mixpanelHelpers'

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
  if (!isBrowser) return

  // TRACK IN MIXPANEL
  mixpanelHelpers.trackMixpanel(action, props)
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

  // TODO Trigger custom GTM event OR use path to trigger Facebook and Google events
  track('create_user', { authProvider })
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
