// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'

// INIT
// ---------
const isMixpanelSetup = false

// TRACK MIXPANEL EVENTS
export const mixpanelTrack = (action, payload, callback = () => {}) => {
  mixpanel.track(action, payload, callback)
}

// SPECIAL EVENTS

// Internal link click
export const mixpanelInternalLinkClick = (url, payload = {}) => {
  mixpanelTrack('link_click', { ...payload, value: url })
}

// External link click
export const mixpanelExternalLinkClick = (url, payload = {}, responseWait = 300) => {
  const { queryParams = {} } = payload
  const newUrl = new URL(url)

  if (Object.entries(queryParams).length) {
    Object.entries(queryParams).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value)
    })
  }

  // Call this to go to page
  const goToPage = () => { window.location.href = newUrl }
  // If mixpanel is not setup, just go to page
  if (!isMixpanelSetup) return goToPage()
  // Start timer ro run page change if mixpanel is too slow
  const waitTimer = setTimeout(goToPage, responseWait)
  // Track click
  mixpanelTrack('link_click', { ...payload, value: newUrl }, () => {
    // After successful track....
    // Stop timer
    clearTimeout(waitTimer)
    // Go to page after succesful track
    goToPage()
  })
}
