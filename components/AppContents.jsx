import React from 'react'
// IMPORT CONTEXTS
import { NavMenuProvider } from './contexts/Navigation'
import { UserProvider } from './contexts/User'
import { ArtistProvider } from './contexts/Artist'
// IMPORT COMPONENTS
import Main from './Main'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

const AppContents = ({ children }) => {
  return (
    <div id="container" className="page--content">

      <UserProvider>
        <ArtistProvider>
          <NavMenuProvider>

            <TheHeader />

            <Main>
              {children}
            </Main>

            <TheFooter />
          </NavMenuProvider>
        </ArtistProvider>
      </UserProvider>
    </div>
  )
}


export default AppContents
