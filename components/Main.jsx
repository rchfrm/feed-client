// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import Page from './Page'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserProvider } from './contexts/User'
import { ArtistProvider } from './contexts/Artist'
// IMPORT ELEMENTS
import Navigation from './elements/Navigation'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT STYLES

function Main({ children }) {
  const { navState } = React.useContext(NavigationContext)
  const backgroundColor = navState.visible ? 'black' : 'white'
  return (
    <main style={{ backgroundColor }}>
      <UserProvider>
        <ArtistProvider>
          <Navigation />
          <Page>
            {children}
          </Page>
        </ArtistProvider>
      </UserProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
