import React from 'react'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'

import * as trackingHelpers from '@/landing/helpers/trackingHelpers'
import { mixpanelPageView } from '@/landing/helpers/mixpanelHelpers'

import TheHead from '@/landing/TheHead'
import TheHeader from '@/landing/TheHeader'
import TheFooter from '@/landing/TheFooter'
import BrowserStoreSetup from '@/landing/BrowserStoreSetup'

// Stylesheets
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'

const FeedLanding = ({ Component, pageProps }) => {
  // SETUP TRACKING
  React.useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.gtm_id,
      auth: process.env.gtm_auth,
      preview: process.env.gtm_preview,
    })
  }, [])
  const router = useRouter()
  const isTrackingSetup = React.useRef(false)
  React.useEffect(() => {
    if (isTrackingSetup.current) return
    // Setup tracking
    trackingHelpers.setupTracking()

    // Trigger page view event
    const handleRouteChange = (url) => {
      mixpanelPageView(url)
    }
    // TRIGGER PAGE VIEW WHEN ROUTE CHANGES
    router.events.on('routeChangeComplete', handleRouteChange)
    // TRIGGER INITIAL PAGE VIEW
    handleRouteChange(router.pathname)

    isTrackingSetup.current = true

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <TheHead />

      <div id="container-landing">

        <TheHeader />

        <main id="page--container-landing">
          <Component {...pageProps} />
        </main>

        <TheFooter />

      </div>

      {/* Setup browser store */}
      <BrowserStoreSetup />
    </>
  )
}

// Export App with Facebook pixel
export default FeedLanding
