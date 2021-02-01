// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'

// INIT
// ---------
// const isProduction = process.env.NODE_ENV === 'production'
const token = process.env.mixpanel_token
let userType
let userId

export const initMixpanel = () => {
  mixpanel.init(
    token,
    {
      api_host: 'https://api-eu.mixpanel.com',
    },
  )
}

export const updateMixpanel = (user) => {
  const { role, id } = user
  userType = role
  userId = id
}

// TRACK MIXPANEL EVENTS
export const mixpanelTrack = (action, payload) => {
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
export const mixpanelLogin = (userId) => {
  mixpanel.identify(userId)
}

// Sign Out
export const mixpanelSignOut = () => {
  mixpanel.reset()
}

// View pagetion
export const mixpanelPageView = (url) => {
  mixpanelTrack('page_view', { value: url })
}


// REGISTER SUPER PROPERTIES
export const mixpanelRegister = (details) => {
  mixpanel.register(details)
}
