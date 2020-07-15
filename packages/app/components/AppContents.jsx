import React from 'react'
// IMPORT CONTEXTS
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'

import { UserProvider } from '@/contexts/UserContext'
import { ArtistProvider } from '@/contexts/ArtistContext'

// IMPORT COMPONENTS
import Main from '@/app/Main'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import TheHeader from '@/app/TheHeader'
import ThePageButtons from '@/app/ThePageButtons'
import TheFooter from '@/app/TheFooter'
import PopupModal from '@/PopupModal'

import BrowserStoreSetup from '@/BrowserStoreSetup'

const AppContents = ({ children }) => {
  return (
    <div id="container" className="page--content">
      <InterfaceContextProvider>
        <UserProvider>
          <ArtistProvider>
            <TheHeader />

            <TheLoadingOverlay />

            <Main>
              {children}
            </Main>

            <ThePageButtons />

            <PopupModal />

            <TheFooter />
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
      {/* Setup browser store */}
      <BrowserStoreSetup />
    </div>
  )
}


export default AppContents
