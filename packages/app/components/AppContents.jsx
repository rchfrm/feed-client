import React from 'react'
// IMPORT CONTEXTS
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import { UserProvider } from '@/app/contexts/User'
import { ArtistProvider } from '@/app/contexts/Artist'
// IMPORT COMPONENTS
import Main from '@/app/Main'
import TheLoadingOverlay from '@/app/TheLoadingOverlay'
import TheHeader from '@/app/TheHeader'
import ThePageButtons from '@/app/ThePageButtons'
import TheFooter from '@/app/TheFooter'

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

            <TheFooter />
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
    </div>
  )
}


export default AppContents
