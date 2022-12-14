import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
// Helpers
import * as insightsHelpers from '@/app/helpers/insightsHelpers'
// Constants
import brandColors from '@/constants/brandColors'

const InsightDataSelectors = ({
  availableDataSources,
  currentPlatform,
  currentDataSource,
  defaultDataSource,
  setCurrentDataSource,
  setCurrentPlatform,
}) => {
  const filterQuerySlug = 'dataset'

  // Return array of data sources that match the current platform
  const platformSources = React.useMemo(() => {
    if (! currentPlatform) return availableDataSources
    return insightsHelpers.getPlatformSources(availableDataSources, currentPlatform)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlatform])

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

  React.useEffect(() => {
    if (! availableDataSources || ! availableDataSources.length || ! currentDataSource) return
    const { platform } = availableDataSources.find(({ name }) => name === currentDataSource) || {}
    setCurrentPlatform(platform || 'facebook')
  }, [currentDataSource, availableDataSources, setCurrentPlatform])

  // if (!currentPlatform) return null

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
      trackProps={{
        action: 'adjust_filter',
        page: 'insights',
      }}
    />
  )
}

InsightDataSelectors.propTypes = {
  availableDataSources: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string,
  currentDataSource: PropTypes.string.isRequired,
  defaultDataSource: PropTypes.string,
  setCurrentDataSource: PropTypes.func.isRequired,
  setCurrentPlatform: PropTypes.func.isRequired,
}

InsightDataSelectors.defaultProps = {
  currentPlatform: '',
  defaultDataSource: '',
}


export default InsightDataSelectors
