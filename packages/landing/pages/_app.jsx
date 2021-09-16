import React from 'react'
import { useRouter } from 'next/router'

import withFBQ from 'next-fbq'

import * as trackingHelpers from '@/landing/helpers/trackingHelpers'
import { mixpanelPageView } from '@/landing/helpers/mixpanelHelpers'

import TheHead from '@/landing/TheHead'
import SetupGtag from '@/landing/SetupGtag'
import TheHeader from '@/landing/TheHeader'
import TheFooter from '@/landing/TheFooter'
import BrowserStoreSetup from '@/landing/BrowserStoreSetup'

// Stylesheets
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'

// TRACKING SERVICE IDS
// Google Analytics
const gaId = 'UA-162381148-2'
// Facebook pixel
const fbqId = '226820538468408'

const FeedLanding = ({ Component, pageProps }) => {
  // SETUP TRACKING
  const router = useRouter()
  const isTrackingSetup = React.useRef(false)
  React.useEffect(() => {
    if (isTrackingSetup.current) return
    // Setup tracking
    trackingHelpers.setupTracking()

    // Trigger page view event
    const handleRouteChange = (url) => {
      trackingHelpers.gtagPageView(url, gaId)
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

      <div id="container">

        <TheHeader />

        <main className="main">
          <Component {...pageProps} />
        </main>

        <TheFooter />

      </div>

      {/* Setup browser store */}
      <BrowserStoreSetup />

      {/* GTAG */}
      <SetupGtag gaId={gaId} />
    </>
  )
}

// Export App with Facebook pixel
export default withFBQ(fbqId)(FeedLanding)
