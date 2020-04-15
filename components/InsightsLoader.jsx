
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
// IMPORT PAGES
import InsightsSummaryLoader from './InsightsSummaryLoader'
import InsightsPageChart from './InsightsPageChart'
import PromotePostsButton from './PromotePostsButton'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/InsightPageCopy'
// IMPORT HELPERS
// IMPORT STYLES
import styles from './InsightsPage.module.css'


function Insights() {
  return (
    <div className="page--container">

      {/* INTRO TEXT */}
      <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />

      <div className={styles.chartsContainer}>
        <InsightsSummaryLoader />

        <InsightsPageChart />

        <PromotePostsButton />
      </div>

      {/* OUTRO TEXT TEXT */}
      <MarkdownText className="ninety-wide  h4--text" markdown={copy.outro} />

    </div>
  )
}

function InsightsLoader() {
// IMPORT CONTEXTS
  const { artist, artistLoading } = React.useContext(ArtistContext)

  if (artistLoading) {
    return <Spinner width={50} color={brandColors.green} />
  } if (artist === null) {
    // If there is no selected artist after the artist has finished loading,
    // show message to say the user needs to their artist pages
    return (
      <p>Please connect some artists</p>
    )
  }
  // Otherwise, show Home
  return <Insights />
}

export default InsightsLoader
