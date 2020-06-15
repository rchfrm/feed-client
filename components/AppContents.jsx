import React from 'react'
// IMPORT CONTEXTS
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import { UserProvider } from '@/contexts/User'
import { ArtistProvider } from '@/contexts/Artist'
// IMPORT COMPONENTS
import Main from '@/Main'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import PopupModal from '@/PopupModal'
import TheHeader from '@/TheHeader'
import ThePageButtons from '@/ThePageButtons'
import TheFooter from '@/TheFooter'

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
    </div>
  )
}


export default AppContents
