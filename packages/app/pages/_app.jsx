// * APP VERSION
import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { PageTransition } from 'next-page-transitions'
import * as Sentry from '@sentry/browser'

import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'
import Head from 'next/head'
import AppContents from '@/app/AppContents'
import SetupReCaptcha from '@/elements/SetupReCaptcha'
import { AuthProvider } from '@/contexts/AuthContext'
import { trackPWA, setupTracking, trackPageView } from '@/helpers/trackingHelpers'

// GLOBAL STORES and DATA
import { parseUrl } from '@/helpers/utils'

const registerServiceWorker = () => {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.info('service worker registered')
          registration.addEventListener('updatefound', () => {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
            const installingWorker = registration.installing
            // eslint-disable-next-line no-console
            console.info('A new service worker is being installed:', installingWorker)
          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.info('Service worker registration failed:', error)
        })
    } else {
      // eslint-disable-next-line no-console
      console.info('Service workers are not supported.')
    }
  })
}

if (process.env.build_env !== 'development') {
  // INIT SENTRY
  Sentry.init({
    dsn: process.env.sentry_dsn,
    release: `feed-client@${(process.env.release_version || 'dev')}`,
    environment: process.env.build_env,
  })
}

// * THE APP
function Feed({ Component, pageProps }) {
  const router = useRouter()
  const previousUrl = React.useRef({})

  React.useEffect(() => {
    // Make background red if running live DB locally
    if (process.env.show_live_warning) {
      const htmlEl = document.getElementsByTagName('html')[0]
      htmlEl.classList.add('_live_warning')
    }

    // Setup tracking
    setupTracking()
    // Setup PWA
    if (process.env.build_env !== 'development') {
      registerServiceWorker()
      trackPWA()
    }

    // Trigger page view event
    const handleRouteChange = (url) => {
      const { pathname, queryString } = parseUrl(url)
      const { pathname: previousPathname } = previousUrl.current
      // Stop here if same pathname
      if (pathname === previousPathname) return
      trackPageView(pathname === '/' ? '/posts' : pathname)
      // Store previous URL
      previousUrl.current = { pathname, queryString }
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <AuthProvider>

      {/* Add title */}
      <Head>
        <title key="meta-title">Feed</title>
      </Head>

      {/* RECAPTCHA */}
      <SetupReCaptcha />

      <AppContents>
        <PageTransition timeout={300} classNames="page-transition">
          <Component key={router.route} {...pageProps} />
        </PageTransition>
      </AppContents>

    </AuthProvider>
  )
}

export default Feed

Feed.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}

Feed.defaultProps = {
  pageProps: {},
}
