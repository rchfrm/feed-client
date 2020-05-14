// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import InitUser from './InitUser'
// IMPORT CONTEXTS
import { SidePanelContextProvider } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import IntegrationErrorHandler from './IntegrationErrorHandler'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT STYLES

function Main({ children }) {
  return (
    <main className="page--container">
      <SidePanelContextProvider>
        <InitUser>
          {children}
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
