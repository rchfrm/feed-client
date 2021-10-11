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
import { setupTracking, trackPageView } from 'shared/helpers/trackingHelpers'
import { parseUrl } from 'shared/helpers/utils'
import { pathify } from 'next/dist/server/lib/squoosh/emscripten-utils'

const FeedLanding = ({ Component, pageProps }) => {
  // SETUP TRACKING
  const isTrackingSetup = React.useRef(false)
  React.useEffect(() => {
    setupTracking()
    isTrackingSetup.current = true
  }, [])

  // TRACK PAGE VIEWS
  const previousPathname = React.useRef(null)
  React.useEffect(() => {
    if (!isTrackingSetup.current) return
    const { pathname } = new URL(window.location.href)
    const pathChanged = !previousPathname || previousPathname.current !== pathname
    if (pathChanged) {
      trackPageView(pathname)
      previousPathname.current = pathname
    }
  })

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
