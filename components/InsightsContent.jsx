
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'

// IMPORT COMPONENTS
import PageHeader from './PageHeader'
import InsightPlatformSelectors from './InsightPlatformSelectors'
import InsightDataSelectors from './InsightDataSelectors'
import InsightsChartLoader from './InsightsChartLoader'
import PromotePostsButton from './PromotePostsButton'
// IMPORT TEXT
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/InsightPageCopy'
// IMPORT STYLES
import styles from './InsightsPage.module.css'


function InsightsContent() {
  // Import artist context
  const { artistLoading, artist, artistId } = React.useContext(ArtistContext)
  // Define states
  const [currentPlatform, setCurrentPlatform] = React.useState('')
  const [currentDataSource, setCurrentDataSource] = React.useState('')
  const [initialLoading, setInitialLoading] = React.useState(true)
  const [pageReady, setPageReady] = React.useState(false)

  // Set page ready after page has loaded
  React.useEffect(() => {
    if (!initialLoading) {
      setTimeout(() => {
        setPageReady(true)
      }, 200)
    }
  }, [initialLoading])

  const availableDataSources = React.useMemo(() => {
    if (artistLoading) return []
    const { _embedded: { data_sources: dataSources } } = artist
    return Object.values(dataSources).map(({ id }) => id)
  }, [artistLoading, artistId])

  if (artistLoading) return <Spinner />

  if (initialLoading) {
    return (
      <>
        <Spinner />
        <InsightsChartLoader
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
          initialLoading={initialLoading}
          setInitialLoading={setInitialLoading}
        />
      </>
    )
  }

  const containerClasses = ['page--container', styles.pageContainer]
  if (pageReady) {
    containerClasses.push(styles._ready)
  }

  return (
    <div className={containerClasses.join(' ')}>

      <PageHeader className={styles.pageHeader} heading="insights" />

      {/* PLATFORM SELECTORS */}
      <InsightPlatformSelectors
        artistId={artistId}
        availableDataSources={availableDataSources}
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
        initialLoading={initialLoading}
      />
      {/* DATASOURCE SELECTORS */}
      <InsightDataSelectors
        availableDataSources={availableDataSources}
        currentPlatform={currentPlatform}
        currentDataSource={currentDataSource}
        setCurrentDataSource={setCurrentDataSource}
        initialLoading={initialLoading}
      />

      {currentPlatform && currentDataSource && (
        <div className={styles.dataContent}>
          <InsightsChartLoader
            currentPlatform={currentPlatform}
            currentDataSource={currentDataSource}
            initialLoading={initialLoading}
            setInitialLoading={setInitialLoading}
          />
          {!initialLoading && (
            <PromotePostsButton
              artist={artist}
              artistId={artistId}
              className={styles.promotePostsButton}
            />
          )}
        </div>
      )}

      {/* OUTRO TEXT TEXT */}
      {!initialLoading && (
        <MarkdownText className="ninety-wide  h4--text" markdown={copy.outro} />
      )}

    </div>
  )
}

export default InsightsContent
