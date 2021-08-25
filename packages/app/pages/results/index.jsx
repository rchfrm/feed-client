import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import ResultsLoader from '@/app/ResultsLoader'

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
      <ResultsLoader />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
