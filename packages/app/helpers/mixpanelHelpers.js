// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'

// INIT
// ---------
// const isProduction = process.env.NODE_ENV === 'production'
const token = process.env.mixpanel_token
let userType

export const initMixpanel = () => {
  mixpanel.init(
    token,
    {
      api_host: 'https://api-eu.mixpanel.com',
    },
  )
}

export const updateMixpanel = (user) => {
  const { role } = user
  userType = role
}

// TRACK MIXPANEL EVENTS
export const trackMixpanel = (action, payload) => {
  // Only LOG track if admin
  if (userType === 'admin') {
    console.group()
    console.info('MIXPANEL SEND')
    console.info('ACTION: ', action)
    console.info(payload)
    console.groupEnd()
    return
  }
  mixpanel.track(action, payload)
}

// SPECIAL EVENTS

// Sign Up
export const mixpanelSignUp = (userId) => {
  mixpanel.alias(userId)
}

// Log in
export const mixpanelIdentify = (userId) => {
  mixpanel.identify(userId)
}

// Sign Out
export const mixpanelSignOut = () => {
  mixpanel.reset()
}

// View page
export const mixpanelPageView = (url) => {
  trackMixpanel('page_view', { value: url })
}


// REGISTER SUPER PROPERTIES
export const mixpanelRegister = (details) => {
  mixpanel.register(details)
}
