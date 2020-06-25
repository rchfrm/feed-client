import Router from 'next/router'

import { useState, useEffect } from 'react'
import { PageTransition } from 'next-page-transitions'
import PropTypes from 'prop-types'

import Head from 'next/head'
import { StripeProvider } from 'react-stripe-elements'
import Script from 'react-load-script'
import * as Sentry from '@sentry/browser'
// GLOBAL STYLES
import '../../shared/css/index.css'
// IMPORT COMPONENTS
import AppContents from '@/app/AppContents'
import SetupGtag from '@/elements/SetupGtag'
// IMPORT CONTEXTS
import { AuthProvider } from '@/contexts/AuthContext'
// IMPORT HELPERS
import { trackPWA, gtagPageView } from '@/helpers/trackingHelpers'

// TRACKING SERVICE IDS
// Google Analytics
const gaId = 'UA-162381148-2'
// Facebook pixel
// const fbqId = '226820538468408'

const registerServiceWorker = () => {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('service worker registered')
          registration.addEventListener('updatefound', () => {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
            const installingWorker = registration.installing
            console.log('A new service worker is being installed:', installingWorker)
          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
          })
        })
        .catch((error) => {
          console.log('Service worker registration failed:', error)
        })
    } else {
      console.log('Service workers are not supported.')
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

function Feed({ Component, pageProps, router }) {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (process.env.build_env !== 'development') {
      registerServiceWorker()
      trackPWA()
    }

    // Trigger page view event
    const handleRouteChange = (url) => gtagPageView(url, gaId)
    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  // Setup stripe to use SSR
  const onStripeLoad = () => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.stripe_provider))
    }
  }

  return (

    <AuthProvider>

      {/* Add title */}
      <Head>
        <title key="meta-title">Feed</title>
      </Head>

      <Script
        url="https://js.stripe.com/v3/"
        onLoad={onStripeLoad}
      />

      {/* GTAG */}
      <SetupGtag gaId={gaId} />

      <StripeProvider stripe={stripe}>

        <AppContents>
          <PageTransition timeout={300} classNames="page-transition">
            <Component key={router.route} {...pageProps} />
          </PageTransition>
        </AppContents>

      </StripeProvider>

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
