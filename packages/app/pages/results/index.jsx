import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

const headerConfig = {
  text: 'results',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      noArtistHeader={headerConfig}
      artistRequired
    >
      Content
    </BasePage>
  )
}

export default testPageReady('app')(Page)
