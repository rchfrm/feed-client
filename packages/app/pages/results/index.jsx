import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import ResultsPage from '@/app/ResultsPage'

const headerConfig = {
  text: 'results',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      noArtistHeader={headerConfig}
      artistRequired
      controlsRequired
    >
      <ResultsPage />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
