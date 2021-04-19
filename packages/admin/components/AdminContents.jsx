import React from 'react'
import InitUser from '@/admin/InitUser'
import { UserProvider } from '@/admin/contexts/UserContext'
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'

import BrowserStoreSetup from '@/BrowserStoreSetup'

import TheHeader from '@/admin/TheHeader'
import TheLoadingOverlay from '@/TheLoadingOverlay'
import PopupModal from '@/PopupModal'


const AdminContents = ({ children }) => {
  return (
    <div id="container-admin" className="page--content">
      <InterfaceContextProvider>
        <UserProvider>
          <TheLoadingOverlay />
          <InitUser>
            <TheHeader />
            <main id="page--container-admin">
              {children}
            </main>
            <PopupModal />
          </InitUser>
        </UserProvider>
      </InterfaceContextProvider>
      {/* Setup browser store */}
      <BrowserStoreSetup />
    </div>
  )
}

export default AdminContents
