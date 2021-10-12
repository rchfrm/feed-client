import * as mixpanelHelpers from '@/landing/helpers/mixpanelHelpers'

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
 */
export default function track({
  action,
  label,
  category,
  description,
  location,
  value,
  mixpanelProps,
  error = false,
  mixpanel = true,
}) {
  console.log('action', action)
  console.log('category', category)
  // Stop here if not browser
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return

  let event_label = label
  if (description) {
    event_label = `${event_label}, ${description}`
  }
  // Fire mixpanel event
  if (mixpanel) {
    const payload = {
      ...mixpanelProps,
      ...(location && { location }),
      ...(category && { category }),
      ...(event_label && { label: event_label }),
      ...(value && { value }),
      ...(error && { error: true }),
    }
    mixpanelHelpers.mixpanelTrack(action, payload)
  }
}
