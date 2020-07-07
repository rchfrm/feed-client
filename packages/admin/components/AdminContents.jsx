import React from 'react'
import InitUser from '@/admin/InitUser'
import { UserProvider } from '@/contexts/UserContext'
import { ArtistProvider } from '@/contexts/ArtistContext'
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'

import BrowserStoreSetup from '@/BrowserStoreSetup'
import popupStore from '@/store/popupStore'

import TheHeader from '@/admin/TheHeader'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import PopupModal from '@/PopupModal'


const AdminContents = ({ children }) => {
  const popupContent = popupStore(state => state.content)
  return (
    <div id="container-admin" className="page--content">
      <InterfaceContextProvider>
        <UserProvider>
          <ArtistProvider disable>
            <TheLoadingOverlay />
            <InitUser>
              <TheHeader />
              <main id="page--container-admin">
                {children}
              </main>
              <PopupModal content={popupContent} />
            </InitUser>
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
      {/* Setup browser store */}
      <BrowserStoreSetup />
    </div>
  )
}

export default AdminContents
