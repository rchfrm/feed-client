// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'

// INIT
// ---------
// const isProduction = process.env.NODE_ENV === 'production'
const token = process.env.MIXPANEL_TOKEN
let userType
let userId

export const initMixpanel = (user) => {
  const { role, id } = user
  userType = role
  userId = id
  mixpanel.init(
    token,
    {
      api_host: 'https://api-eu.mixpanel.com',
    },
  )
}


// TRACK MIXPANEL EVENTS
export const mixpanelTrack = (action, payload) => {
  // Only LOG track if admin
  if (userType === 'admin') {
    console.group()
    console.info('MIXPANEL SEND')
    console.info('action', action)
    console.info(payload)
    console.groupEnd()
    return
  }
  mixpanel.track(action, payload)
}


// REGISTER SUPER PROPERTIES
export const mixpanelRegister = (details) => {
  mixpanel.register(details)
}
