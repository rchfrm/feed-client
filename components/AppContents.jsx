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
// IMPORT LOCAL STATE
import popupStore from '@/store/popupStore'


const AppContents = ({ children }) => {
  const popupContent = popupStore(state => state.content)
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

            {popupContent && <PopupModal content={popupContent} />}

            <TheFooter />
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
    </div>
  )
}


export default AppContents
