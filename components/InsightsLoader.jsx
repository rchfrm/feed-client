
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'

// IMPORT COMPONENTS
import InsightPlatformSelectors from './InsightPlatformSelectors'
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

  return (
    <div className="page--container">

      {/* INTRO TEXT */}
      <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />

      {/* PLATFORM SELECTORS */}
      <InsightPlatformSelectors
        artist={artist}
        artistId={artistId}
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
      />


      {currentPlatform && (
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
