
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
// IMPORT TEXT
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/InsightPageCopy'
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
  const { artistLoading } = React.useContext(ArtistContext)
  if (artistLoading) return <Spinner />
  // Otherwise, show page
  return <Insights />
}

export default InsightsLoader
