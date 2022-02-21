import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

const headerConfig = {
  text: 'get started',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      controlsRequired
    >
      <div>Get started..</div>
    </BasePage>
  )
}

export default testPageReady('app')(Page)
