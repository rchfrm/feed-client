import React from 'react'
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
  // console.log('React.useContext(NavigationContext)', React.useContext(NavigationContext))
  const { visible: navVisible } = React.useContext(NavigationContext)
  const backgroundColor = navVisible ? 'black' : 'white'

  return (

    <AuthProvider>

      <StripeProvider apiKey={process.env.stripe_provider}>

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
