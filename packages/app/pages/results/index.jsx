import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ResultsLoader from '@/app/ResultsLoader'

import Alert from '@/elements/Alert'
import ResultsPostsPagePopup from '@/app/ResultsPostsPagePopup'

const headerConfig = {
  text: 'results',
}

const Page = () => {
  const [popupContents, setPopupContents] = React.useState(<ResultsPostsPagePopup />)
  return (
    <BasePage
      headerConfig={headerConfig}
      noArtistHeader={headerConfig}
      artistRequired
    >
      <Alert
        contents={popupContents}
        resetAlert={() => setPopupContents(null)}
      />
      <ResultsLoader />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
