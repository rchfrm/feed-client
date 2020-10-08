import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
// Helpers
import * as chartHelpers from '@/app/helpers/chartHelpers'
// Constants
import brandColors from '@/constants/brandColors'

import * as utils from '@/helpers/utils'

const InsightDataSelectors = ({
  availableDataSources,
  currentPlatform,
  currentDataSource,
  defaultDataSource,
  setCurrentDataSource,
  initialLoading,
}) => {
  // Return array of data sources that match the current platform
  const platformSources = React.useMemo(() => {
    if (!currentPlatform) return []
    return chartHelpers.getPlatformSources(availableDataSources, currentPlatform)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlatform])

  const filterQuerySlug = 'dataset'

  // Set first data sources as active when platform changes
  React.useEffect(() => {
    if (!platformSources.length || initialLoading) return
    // If current data set exists in the current platform, don't reset data set
    const { query: currentQueries } = utils.parseUrl(window.location.href)
    const currentDataSource = currentQueries[filterQuerySlug]
    const isSamePlatform = !!platformSources.find(({ name }) => name === currentDataSource)
    if (isSamePlatform) return
    // Get and set initial data source
    const source = chartHelpers.getInitialDataSource(platformSources, currentPlatform)
    setCurrentDataSource(source)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlatform, initialLoading, setCurrentDataSource])

  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return platformSources.map(({ title, name, subtitle, platform }) => {
      const { bg: color } = brandColors[platform]
      return {
        id: name,
        title,
        subtitle,
        color,
      }
    })
  }, [platformSources])

  if (!currentPlatform) return null

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentDataSource}
      defaultOptionId={defaultDataSource}
      setActiveOptionId={setCurrentDataSource}
      labelText="Select a data set"
      buttonType="text"
      useSetQuery
      useSetLocalStorage
      querySlug={filterQuerySlug}
    />
  )
}

InsightDataSelectors.propTypes = {
  availableDataSources: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
  defaultDataSource: PropTypes.string,
  setCurrentDataSource: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
}

InsightDataSelectors.defaultProps = {
  defaultDataSource: '',
}


export default InsightDataSelectors
