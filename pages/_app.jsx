import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import Script from 'react-load-script'
import * as Sentry from '@sentry/browser'
// IMPORT COMPONENTS
import Main from '../components/Main'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
// IMPORT CONTEXTS
import { AuthProvider } from '../components/contexts/Auth'
import { NavMenuProvider, NavigationContext } from '../components/contexts/Navigation'
// IMPORT ELEMENTS

// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import '../assets/styles/index.css'

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
  Sentry.init({ dsn: process.env.sentry_dsn })
}

function Feed({ Component, pageProps }) {
  const { visible: navVisible } = useContext(NavigationContext)
  const backgroundColor = navVisible ? 'black' : 'white'

  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    registerServiceWorker()
  }, [])

  // Setup stripe to use SSR
  const onStripeLoad = () => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.stripe_provider))
    }
  }

  // const footerClass = navState.visible ? 'navOn' : 'navOff'

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

      <StripeProvider stripe={stripe}>

        <NavMenuProvider>

          <div id="container">

            <TheHeader />

            <Main>
              <Component {...pageProps} />
            </Main>

            <TheFooter />

          </div>

        </NavMenuProvider>

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
