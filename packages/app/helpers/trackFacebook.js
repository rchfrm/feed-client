const isProduction = process.env.NODE_ENV === 'production'

const standardEvents = [
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'PageView',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
]

const trackFacebook = (action, payload) => {
  const { fbq } = window
  const trackType = standardEvents.includes(action) ? 'track' : 'trackCustom'
  // JUST LOG IF NOT PRODUCTION
  if (!isProduction) {
    console.group()
    console.info('FB SEND')
    console.info('trackType', trackType)
    console.info('action', action)
    console.info(payload)
    console.groupEnd()
    return
  }
  // stop here IF FBQ NOT LOADED
  if (!fbq) return
  // TRACK
  fbq(trackType, action, payload)
}

export default trackFacebook
