import React from 'react'
import TheHead from '@/landing/TheHead'
import TheHeader from '@/landing/TheHeader'
import TheFooter from '@/landing/TheFooter'
import BrowserStoreSetup from '@/landing/BrowserStoreSetup'
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'
import { setupTracking, trackPageView } from '@/helpers/trackingHelpers'

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

      <TheHeader />

      <main
        className={[
          'block',
          'flex-auto',
          'w-full',
          'mt-24',
        ].join(' ')}
      >
        <Component {...pageProps} />
      </main>

      <TheFooter />

      {/* Setup browser store */}
      <BrowserStoreSetup />
    </>
  )
}

// Export App with Facebook pixel
export default FeedLanding
