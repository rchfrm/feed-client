
import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import InsightPlatformSelectors from '@/app/InsightPlatformSelectors'
import InsightDataSelectors from '@/app/InsightDataSelectors'
import InsightsChartLoader from '@/app/InsightsChartLoader'
import ShowIntegrationsButton from '@/app/ShowIntegrationsButton'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'

import * as insightsHelpers from '@/app/helpers/insightsHelpers'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/InsightPageCopy'

import styles from '@/app/InsightsPage.module.css'

const InsightsContent = () => {
  // Import artist context
  const { artistLoading, artist, artistId } = React.useContext(ArtistContext)
  const { hasGrowthPlan } = artist
  // Define states
  const [currentPlatform, setCurrentPlatform] = React.useState('')
  const [currentDataSource, setCurrentDataSource] = React.useState('')
  const [initialLoading, setInitialLoading] = React.useState(true)
  const [pageReady, setPageReady] = React.useState(false)

  // GET AVAILABLE DATA SOURCES
  const availableDataSources = React.useMemo(() => {
    if (!artistId || artistLoading) return []
    const { _embedded: { dataSources } } = artist
    const allSources = Object.values(dataSources).map((name) => name)
    return insightsHelpers.getAvailableSources(allSources)
  // eslint-disable-next-line
  }, [artistId, artistLoading])

  // GET AND SET PLATFORMS AND DEFAULT PLATFORM
  const [availablePlatforms, setAvailablePlatforms] = React.useState(null)
  const [defaultPlatform, setDefaultPlatform] = React.useState('')
  React.useEffect(() => {
    // Stop here if no data sources
    if (!availableDataSources.length) return
    const availablePlatforms = insightsHelpers.getAvailablePlatforms(availableDataSources)
    const defaultPlatform = insightsHelpers.getInitialPlatform(availablePlatforms)
    setAvailablePlatforms(availablePlatforms)
    setDefaultPlatform(defaultPlatform)
  // eslint-disable-next-line
  }, [availableDataSources.length])

  // GET DEFAULT DATA SOURCE
  const defaultDataSource = React.useMemo(() => {
    return insightsHelpers.getInitialDataSource(availableDataSources, currentPlatform)
  // eslint-disable-next-line
  }, [currentPlatform])

  // RESET THINGS WHEN ARTIST CHANGES
  React.useEffect(() => {
    if (artistLoading) {
      setCurrentPlatform('')
      setCurrentDataSource('')
      setAvailablePlatforms(null)
      setDefaultPlatform('')
    }
  }, [artistId, artistLoading])

  // Set page ready after page has loaded
  React.useEffect(() => {
    if (!initialLoading) {
      setTimeout(() => {
        setPageReady(true)
      }, 100)
    }
  }, [initialLoading])

  if (!hasGrowthPlan) {
    return (
      <DisabledActionPrompt
        copy={copy.planRestriction}
        version="border"
        section="insights"
        className="sm:w-fit mr-auto"
      />
    )
  }

  if (artistLoading || !availablePlatforms || !availableDataSources.length) return null

  const containerClasses = [styles.pageContainer]

  if (pageReady) {
    containerClasses.push(styles._ready)
  }

  return (
    <div className={containerClasses.join(' ')}>

      {/* PLATFORM SELECTORS */}
      <InsightPlatformSelectors
        artistId={artistId}
        availableDataSources={availableDataSources}
        availablePlatforms={availablePlatforms}
        currentPlatform={currentPlatform}
        currentDataSource={currentDataSource}
        defaultPlatform={defaultPlatform}
        defaultDataSource={defaultDataSource}
        setCurrentPlatform={setCurrentPlatform}
        setCurrentDataSource={setCurrentDataSource}
      />
      {/* DATASOURCE SELECTORS */}
      <InsightDataSelectors
        availableDataSources={availableDataSources}
        currentPlatform={currentPlatform}
        currentDataSource={currentDataSource}
        defaultDataSource={defaultDataSource}
        setCurrentDataSource={setCurrentDataSource}
        setCurrentPlatform={setCurrentPlatform}
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
        <div>
          <div className="text--block h4--text mb-8">
            <p>Can't see one of your accounts?</p>
            <ShowIntegrationsButton
              text="+ Connect more integrations"
            />
          </div>
          <MarkdownText className="h4--text" markdown={copy.outro} />
        </div>
      )}

    </div>
  )
}

export default InsightsContent
