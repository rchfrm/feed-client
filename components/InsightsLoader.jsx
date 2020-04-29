
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'

// IMPORT COMPONENTS
import InsightPlatformSelectors from './InsightPlatformSelectors'
import InsightDataSelectors from './InsightDataSelectors'
import InsightsPageChart from './InsightsPageChart'
import PromotePostsButton from './PromotePostsButton'
// IMPORT TEXT
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/InsightPageCopy'
// IMPORT STYLES
import styles from './InsightsPage.module.css'


function Insights() {
  // Import artist context
  const { artist, artistId } = React.useContext(ArtistContext)
  // Define states
  const [currentPlatform, setCurrentPlatform] = React.useState('')
  const [currentDataSource, setCurrentDataSource] = React.useState('')

  return (
    <div className="page--container">

      {/* PLATFORM SELECTORS */}
      <InsightPlatformSelectors
        artist={artist}
        artistId={artistId}
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
      />
      {/* DATASOURCE SELECTORS */}
      <InsightDataSelectors
        artist={artist}
        currentPlatform={currentPlatform}
        currentDataSource={currentDataSource}
        setCurrentDataSource={setCurrentDataSource}
      />

      {/* DATA SOURCE SELECTORS */}


      {currentPlatform && currentDataSource && (
        <div className={styles.chartsContainer}>
          <InsightsPageChart />

          <PromotePostsButton />
        </div>
      )}

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
