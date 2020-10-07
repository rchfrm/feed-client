
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
// IMPORT ELEMENTS
// IMPORT COMPONENTS
import InsightPlatformSelectors from '@/app/InsightPlatformSelectors'
import InsightDataSelectors from '@/app/InsightDataSelectors'
import InsightsChartLoader from '@/app/InsightsChartLoader'
// IMPORT HELPERS
import * as chartHelpers from '@/app/helpers/chartHelpers'
// IMPORT TEXT
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/InsightPageCopy'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'


function InsightsContent() {
  // Import artist context
  const { artistLoading, artist, artistId } = React.useContext(ArtistContext)
  // Define states
  const [currentPlatform, setCurrentPlatform] = React.useState('')
  const [currentDataSource, setCurrentDataSource] = React.useState('')
  const [initialLoading, setInitialLoading] = React.useState(true)
  const [pageReady, setPageReady] = React.useState(false)

  // GET AVAILABLE DATA SOURCES
  const availableDataSources = React.useMemo(() => {
    if (!artistId) return []
    const { _embedded: { data_sources: dataSources } } = artist
    const allSources = Object.values(dataSources).map((name) => name)
    return chartHelpers.getAvailableSources(allSources)
  // eslint-disable-next-line
  }, [artistId])

  // GET ALL AVAILABLE PLATFORMS
  const availablePlatforms = React.useMemo(() => {
    if (!availableDataSources.length) return []
    return chartHelpers.getAvailablePlatforms(availableDataSources)
  // eslint-disable-next-line
  }, [artistId, availableDataSources.length])

  const defaultPlatform = React.useMemo(() => {
    return chartHelpers.getInitialPlatform(availablePlatforms)
  }, [availablePlatforms])

  // SET INITIAL PLATFORM AND DATA SOURCE
  React.useEffect(() => {
    if (!availablePlatforms.length || !currentPlatform) return
    // Get and set initial data source
    const source = chartHelpers.getInitialDataSource(availableDataSources, currentPlatform)
    setCurrentDataSource(source)
  // eslint-disable-next-line
  }, [artistId, currentPlatform, availablePlatforms.length])

  // Set page ready after page has loaded
  React.useEffect(() => {
    if (!initialLoading) {
      setTimeout(() => {
        setPageReady(true)
      }, 100)
    }
  }, [initialLoading])

  if (artistLoading) return null

  const containerClasses = [styles.pageContainer]
  if (pageReady) {
    containerClasses.push(styles._ready)
  }

  return (
    <div className={containerClasses.join(' ')}>

      {/* PLATFORM SELECTORS */}
      <InsightPlatformSelectors
        artistId={artistId}
        availablePlatforms={availablePlatforms}
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
        defaultPlatform={defaultPlatform}
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
        <div
          className={[
            styles.dataContent,
          ].join(' ')}
        >
          <InsightsChartLoader
            currentPlatform={currentPlatform}
            currentDataSource={currentDataSource}
            initialLoading={initialLoading}
            setInitialLoading={setInitialLoading}
          />
        </div>
      )}

      {/* OUTRO TEXT TEXT */}
      {!initialLoading && (
        <MarkdownText className="h4--text" markdown={copy.outro} />
      )}

    </div>
  )
}

export default InsightsContent
