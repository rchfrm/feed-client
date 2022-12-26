import React from 'react'
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import { UserProvider } from '@/app/contexts/UserContext'
import { ArtistProvider } from '@/app/contexts/ArtistContext'
import { TargetingContextProvider } from '@/app/contexts/TargetingContext'
import { SidePanelContextProvider } from '@/contexts/SidePanelContext'
import Main from '@/app/Main'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import Header from '@/app/Header'
import SideNav from '@/app/SideNav'
import TheFooter from '@/app/TheFooter'
import PopupModal from '@/PopupModal'
import AlertModal from '@/AlertModal'

import BrowserStoreSetup from '@/BrowserStoreSetup'

const AppContents = ({ children }) => {
  return (
    <div id="container" className="page--content">
      <InterfaceContextProvider>
        <UserProvider>
          <ArtistProvider>
            <TargetingContextProvider>
              <SidePanelContextProvider>
                <Header />

                <TheLoadingOverlay />

                <Main>
                  {children}
                </Main>

                <SideNav />

                {/* SITEWIDE MODALS */}
                <PopupModal />
                <AlertModal />

                <TheFooter />
              </SidePanelContextProvider>
            </TargetingContextProvider>
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
      {/* Setup browser store */}
      <BrowserStoreSetup />
    </div>
  )
}

export default AppContents
