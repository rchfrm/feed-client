// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import InitUser from './InitUser'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserProvider } from './contexts/User'
import { ArtistProvider } from './contexts/Artist'
// IMPORT ELEMENTS
import IntegrationErrorHandler from './IntegrationErrorHandler'
import TheNavigation from './TheNavigation'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT STYLES

function Main({ children }) {
  const { navState } = React.useContext(NavigationContext)
  const mainClass = navState.visible ? 'navOn' : 'navOff'
  const pageContainerClass = navState.visible ? 'hidden' : ''

  return (
    <main className={[mainClass, 'main'].join(' ')}>
      <UserProvider>
        <ArtistProvider>
          <TheNavigation />
          <InitUser>
            <div className={`page--container sdfsdfskj ${pageContainerClass}`}>
              {children}
            </div>
            <IntegrationErrorHandler />
          </InitUser>
        </ArtistProvider>
      </UserProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
