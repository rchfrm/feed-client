// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import InitUser from '@/app/InitUser'
// IMPORT CONTEXTS
import { SidePanelContextProvider } from '@/app/contexts/SidePanelContext'
// IMPORT ELEMENTS
import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT STYLES

function Main({ children }) {
  return (
    <main id="page--container">
      <SidePanelContextProvider>
        <InitUser>
          {children}
          <IntegrationErrorHandler />
          <NotificationsHandler />
        </InitUser>
      </SidePanelContextProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
