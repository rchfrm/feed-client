// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'

// INIT
// ---------
// const isProduction = process.env.NODE_ENV === 'production'
const token = process.env.mixpanel_token
let isMixpanelSetup = false
let userType

export const initMixpanel = () => {
  mixpanel.init(
    token,
    {
      api_host: 'https://api-eu.mixpanel.com',
      loaded: () => {
        isMixpanelSetup = true
      },
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
    if (payload) {
      console.info(payload)
    }
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

// External link click
export const mixpanelExternalLinkClick = ({
  url,
  eventName = 'link_click',
  payload = {},
  responseWait = 300,
  useNewTab = false,
}) => {
  // Call this to go to page
  const goToPage = () => {
    console.info('goToPage', url)
    if (useNewTab) return window.open(url)
    window.location.href = url
  }
  // If mixpanel is not setup, just go to page
  if (!isMixpanelSetup) return goToPage()
  // Start timer ro run page change if mixpanel is too slow
  const waitTimer = setTimeout(goToPage, useNewTab ? 0 : responseWait)
  // Track click
  trackMixpanel(eventName, { ...payload, value: url }, () => {
    // After successful track....
    // Stop timer
    clearTimeout(waitTimer)
    // Go to page after succesful track
    goToPage()
  })
}

// REGISTER SUPER PROPERTIES
export const mixpanelRegister = (details) => {
  mixpanel.register(details)
}
