import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
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


function Feed({ Component, pageProps }) {
  const { visible: navVisible } = React.useContext(NavigationContext)
  const backgroundColor = navVisible ? 'black' : 'white'
  // Setup stripe to use SSR
  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    setStripe(window.Stripe(process.env.stripe_provider))
  })

  return (

    <AuthProvider>

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
