import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { PageTransition } from 'next-page-transitions'
import { StripeProvider } from 'react-stripe-elements'
import Script from 'react-load-script'
import withFBQ from 'next-fbq'
import * as Sentry from '@sentry/browser'
// GLOBAL STYLES
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'
// IMPORT COMPONENTS
import AppContents from '@/app/AppContents'
import SetupGtag from '@/elements/SetupGtag'
// IMPORT CONTEXTS
import { AuthProvider } from '@/contexts/AuthContext'
// IMPORT HELPERS
import { trackPWA, gtagPageView, setupTracking } from '@/app/helpers/trackingHelpers'
import { mixpanelPageView } from '@/app/helpers/mixpanelHelpers'

// GLOBAL STORES and DATA
import globalData from '@/app/tempGlobalData/globalData.json'
import { formatDictionary } from '@/app/helpers/notificationsHelpers'
import useNotificationStore from '@/app/store/notificationsStore'

const getSetDictionary = state => state.setDictionary

// TRACKING SERVICE IDS
// Google Analytics
const gaId = 'UA-162381148-2'
// Facebook pixel
const fbqId = '226820538468408'

const registerServiceWorker = () => {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.info('service worker registered')
          registration.addEventListener('updatefound', () => {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
            const installingWorker = registration.installing
            console.info('A new service worker is being installed:', installingWorker)
          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
          })
        })
        .catch((error) => {
          console.info('Service worker registration failed:', error)
        })
    } else {
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
  const [stripe, setStripe] = React.useState(null)

  React.useEffect(() => {
    // Setup tracking
    setupTracking()
    // Setup PWA
    if (process.env.build_env !== 'development') {
      registerServiceWorker()
      trackPWA()
    }

    // Trigger page view event
    const handleRouteChange = (url) => {
      gtagPageView(url, gaId)
      mixpanelPageView(url)
    }
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

  // STORE DICTIONARY in GLOBAL STATE
  const isDictionarySet = React.useRef(false)
  const setDictionary = useNotificationStore(getSetDictionary)
  if (!isDictionarySet.current) {
    const { allNotifications } = globalData
    const dictionaryFormatted = formatDictionary(allNotifications)
    setDictionary(dictionaryFormatted)
    isDictionarySet.current = true
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

export default withFBQ(fbqId)(Feed)

Feed.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}

Feed.defaultProps = {
  pageProps: {},
}
