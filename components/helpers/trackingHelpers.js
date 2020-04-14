import * as Sentry from '@sentry/browser'

export const fireGAEvent = (payload) => {
  const { ga } = window
  if (!ga) {
    console.info('GA SEND', payload)
    return
  }
  ga('send', payload)
}

export const fireSentryError = ({ category, action, label, description }) => {
  let message = ''
  if (description) message += `${description}\n`
  if (category) message += `Error category: ${category}\n`
  if (action) message += `Error action: ${action}\n`
  if (label) message += `Error label: ${label}\n`
  Sentry.captureException(new Error(message))
}

/**
 * @param {string} hitType
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {string} description
 * @param {boolean} error
 */
export const track = ({
  hitType = 'event',
  category,
  action,
  label,
  description,
  error = false,
}) => {
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
  // Build GA payload
  const gaPayload = {
    hitType,
    eventCategory: error ? 'Error' : category,
    eventAction: action,
    eventLabel: label,
  }
  // Send off event to GA
  fireGAEvent(gaPayload)
  // If error, fire in sentry also
  if (error) {
    fireSentryError({ category, action, label, description })
  }
}
