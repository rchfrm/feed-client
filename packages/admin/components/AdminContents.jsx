import React from 'react'
import { UserProvider } from '@/contexts/UserContext'
import { ArtistProvider } from '@/contexts/ArtistContext'
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import TheLoadingOverlay from '@/TheLoadingOverlay'

const AdminContents = ({ children }) => {
  return (
    <div id="container" className="page--content">
      <InterfaceContextProvider>
        <UserProvider>
          <ArtistProvider>
            <TheLoadingOverlay />
            <main id="page--container">
              {children}
            </main>
          </ArtistProvider>
        </UserProvider>
      </InterfaceContextProvider>
    </div>
  )
}

export default AdminContents
