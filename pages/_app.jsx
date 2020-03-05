import { useState, useContext } from 'react'
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

if (process.env.build_env !== 'development') {
  Sentry.init({ dsn: process.env.sentry_dsn })
}

function Feed({ Component, pageProps }) {
  const { visible: navVisible } = useContext(NavigationContext)
  const backgroundColor = navVisible ? 'black' : 'white'

  const [stripe, setStripe] = useState(null)

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

      <StripeProvider stripe={stripe}>

        <NavMenuProvider>

          <div id="container" style={{ backgroundColor }}>

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
