import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import TargetingContent from '@/app/TargetingContent'

import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

import { UserContext } from '@/contexts/UserContext'

const headerConfig = {
  text: 'targeting controls',
}

const Page = () => {
  // * FOR TESTING
  // * Forward to home is not admin
  const { user } = React.useContext(UserContext)
  React.useEffect(() => {
    if (!user.id) return null
    if (user.role !== 'admin') {
      window.location.replace(window.location.origin)
    }
  }, [user.role, user.id])
  if (user.role !== 'admin') return null
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
    >
      <TargetingContextProvider>
        <TargetingContent />
      </TargetingContextProvider>
    </BasePage>
  )
}

export default testPageReady('app')(Page)
