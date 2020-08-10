import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
// Helpers
import * as chartHelpers from '@/app/helpers/chartHelpers'
// Constants
import brandColors from '@/constants/brandColors'

const InsightDataSelectors = ({
  availableDataSources,
  currentPlatform,
  currentDataSource,
  setCurrentDataSource,
  initialLoading,
}) => {
  // Return array of data sources that match the current platform
  const platformSources = React.useMemo(() => {
    if (!currentPlatform) return []
    return chartHelpers.getPlatformSources(availableDataSources, currentPlatform)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlatform])

  // Set first data sources as active when platfrorm changes
  React.useEffect(() => {
    if (!platformSources.length || initialLoading) return
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

  if (initialLoading) return null

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentDataSource}
      setActiveOptionId={setCurrentDataSource}
      labelText="Select a data set"
      buttonType="text"
    />
  )
}

InsightDataSelectors.propTypes = {
  availableDataSources: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
  setCurrentDataSource: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
}

export default InsightDataSelectors
