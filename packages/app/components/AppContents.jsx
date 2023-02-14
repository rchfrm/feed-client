import React from 'react'
import { InterfaceContextProvider } from '@/app/contexts/InterfaceContext'
import { UserProvider } from '@/app/contexts/UserContext'
import { ArtistProvider } from '@/app/contexts/ArtistContext'
import { TargetingContextProvider } from '@/app/contexts/TargetingContext'
import { SidePanelContextProvider } from '@/contexts/SidePanelContext'
import Main from '@/app/Main'
import TheLoadingOverlay from '@/app/TheLoadingOverlay'
import Header from '@/app/Header'
import SubHeader from '@/app/SubHeader'
import SideNav from '@/app/SideNav'
import TheFooter from '@/app/TheFooter'
import PopupModal from '@/PopupModal'
import AlertModal from '@/AlertModal'
import { useRouter } from 'next/router'
import * as ROUTES from '@/app/constants/routes'

import BrowserStoreSetup from '@/BrowserStoreSetup'

const AppContents = ({ children }) => {
  const { pathname } = useRouter()
  const isGeneralPage = ROUTES.generalPages.includes(pathname)

  return (
    <div
      id="container"
      className={[
        'page--content',
        isGeneralPage ? 'md:!pt-40' : null,
      ].join(' ')}
    >
      <UserProvider>
        <InterfaceContextProvider>
          <ArtistProvider>
            <TargetingContextProvider>
              <SidePanelContextProvider>
                <Header />
                <SubHeader />

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
        </InterfaceContextProvider>
      </UserProvider>
      {/* Setup browser store */}
      <BrowserStoreSetup />
    </div>
  )
}

export default AppContents
