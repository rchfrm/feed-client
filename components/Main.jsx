// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import InitUser from './InitUser'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { SidePanelContextProvider } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import IntegrationErrorHandler from './IntegrationErrorHandler'
import TheNavigation from './TheNavigation'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT STYLES

function Main({ children }) {
  const { navState } = React.useContext(NavigationContext)
  const mainClass = navState.visible ? 'navOn' : 'navOff'
  const pageContainerNavClass = navState.visible ? 'hidden' : ''
  const pageContainerClasses = ['page--container', pageContainerNavClass].join(' ')

  return (
    <main className={[mainClass, 'main'].join(' ')}>
      <TheNavigation />
      <SidePanelContextProvider>
        <InitUser>
          <div className={pageContainerClasses}>
            {children}
          </div>
          <IntegrationErrorHandler />
        </InitUser>
      </SidePanelContextProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
