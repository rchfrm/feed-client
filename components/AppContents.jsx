import React from 'react'
// IMPORT CONTEXTS
import { UserProvider } from './contexts/User'
import { ArtistProvider } from './contexts/Artist'
// IMPORT COMPONENTS
import Main from './Main'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

const AppContents = ({ children }) => {
  return (
    <div id="container">

      <UserProvider>
        <ArtistProvider>

          <TheHeader />

          <Main>
            {children}
          </Main>

          <TheFooter />

        </ArtistProvider>
      </UserProvider>
    </div>
  )
}


export default AppContents
