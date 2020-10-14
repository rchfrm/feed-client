import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import TargetingContent from '@/app/TargetingContent'

import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

const headerConfig = {
  text: 'targeting controls',
}

const Page = () => {
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
