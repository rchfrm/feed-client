import React from 'react'
import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ControlsContent from '@/app/ControlsContent'

const headerConfig = {
  text: 'controls',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      controlsRequired
      hasNoProfilesPage
      hasPrimaryLinks
    >
      <ControlsContent />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
