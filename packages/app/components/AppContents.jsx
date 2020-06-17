import React from 'react'
// IMPORT CONTEXTS
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import { UserProvider } from '@/contexts/UserContext'
import { ArtistProvider } from '@/contexts/ArtistContext'

// IMPORT COMPONENTS
import Main from '@/app/Main'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import PopupModal from '@/PopupModal'

import TheHeader from '@/app/TheHeader'
import ThePageButtons from '@/app/ThePageButtons'
import TheFooter from '@/app/TheFooter'

import BrowserStoreSetup from '@/BrowserStoreSetup'
// IMPORT LOCAL STATE
import popupStore from '@/store/popupStore'


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
