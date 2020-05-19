import React from 'react'
// IMPORT CONTEXTS
import { InterfaceContextProvider } from './contexts/InterfaceContext'
import { UserProvider } from './contexts/User'
import { ArtistProvider } from './contexts/Artist'
// IMPORT COMPONENTS
import Main from './Main'
import TheHeader from './TheHeader'
import ThePageButtons from './ThePageButtons'
import TheFooter from './TheFooter'

const AppContents = ({ children }) => {
  return (
    <div id="container" className="page--content">

      <UserProvider>
        <ArtistProvider>
          <InterfaceContextProvider>
            <TheHeader />

            <Main>
              {children}
            </Main>

            <ThePageButtons />

            <TheFooter />
          </InterfaceContextProvider>
        </ArtistProvider>
      </UserProvider>
    </div>
  )
}


export default AppContents
