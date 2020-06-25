import React from 'react'
import { InterfaceContextProvider } from '@/contexts/InterfaceContext'
import TheLoadingOverlay from '@/TheLoadingOverlay'

const AdminContents = ({ children }) => {
  return (
    <div id="container" className="page--content">
      <InterfaceContextProvider>
        <TheLoadingOverlay />
        <main id="page--container">
          {children}
        </main>
      </InterfaceContextProvider>
    </div>
  )
}

export default AdminContents
