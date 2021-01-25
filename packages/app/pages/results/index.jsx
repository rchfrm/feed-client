import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import FunnelsContent from '@/app/FunnelsContent'

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
      <FunnelsContent />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
