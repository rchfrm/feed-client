const isProduction = process.env.NODE_ENV === 'production'

// RUN THIS TO ENABLE GTAG
let gtagEnabled = false
export const enableGtag = () => {
  gtagEnabled = true
}

// CROSS DOMAINS
const gaCrossDomains = [
  'tryfeed.co',
  'blog.tryfeed.co',
  'beta.tryfeed.co',
  'staging.tryfeed.co',
  'getfed.app',
  'beta.tryfeed.co',
  'blog.getfed.app',
]

export const getCrossDomainsString = () => {
  return gaCrossDomains.reduce((str, url, index) => {
    if (index === 0) return `${str}'${url}'`
    const suffix = index === gaCrossDomains.length - 1 ? ']' : ''
    return `${str}, '${url}'${suffix}`
  }, '[')
}

// PAGE VIEW
export const trackGooglePageView = (url, gaId) => {
  const { gtag } = window
  if (!gtag) return
  gtag('config', gaId, {
    page_path: url,
    linker: {
      domains: gaCrossDomains,
    },
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackGoogle = (action, payload) => {
  const {
    event_callback,
  } = payload

  // If not production just log event
  if (!isProduction) {
    // Log GA INFO
    console.info('GA SEND', payload)
    return
  }

  // STOP HERE IF GTAG NOT ENABLED
  const { gtag } = window
  if (!gtag || !gtagEnabled) {
    // Run callback (if present)
    if (typeof event_callback === 'function') event_callback()
    return
  }

  // SEND EVENT (with payload)
  // {
  //   'event_category': <category>,
  //   'event_label': <label>,
  //   'value': <value>
  // }
  gtag('event', action, payload)
}
