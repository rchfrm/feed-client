import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
import Icon from '@/elements/Icon'
// Constants
import brandColors from '@/constants/brandColors'

const InsightPlatformSelectors = ({
  availablePlatforms,
  currentPlatform,
  currentDataSource,
  defaultPlatform,
  defaultDataSource,
  setCurrentPlatform,
  setCurrentDataSource,
  availableDataSources,
}) => {
  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return availablePlatforms.map(({ title, id }) => {
      const { bg: color, text: activeTextColor } = brandColors[id]
      // Get icon color
      const iconColor = id === currentPlatform ? activeTextColor : color
      const icon = <Icon color={iconColor} version={id} />
      return {
        id,
        title,
        icon,
        color,
        activeTextColor,
      }
    })
  }, [availablePlatforms, currentPlatform])

  // Update data source when changing platform
  React.useEffect(() => {
    if (!currentDataSource) return
    const { platform } = availableDataSources.find(({ name }) => name === currentDataSource)
    if (platform === currentPlatform) return
    setCurrentDataSource(defaultDataSource)
  // eslint-disable-next-line
  }, [currentPlatform, defaultDataSource, availableDataSources])

  if (!defaultPlatform) return null

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentPlatform}
      defaultOptionId={defaultPlatform}
      setActiveOptionId={setCurrentPlatform}
      labelText="Select a platform"
    />
  )
}

InsightPlatformSelectors.propTypes = {
  availablePlatforms: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string,
  currentDataSource: PropTypes.string,
  setCurrentPlatform: PropTypes.func.isRequired,
  setCurrentDataSource: PropTypes.func.isRequired,
  defaultPlatform: PropTypes.string,
  defaultDataSource: PropTypes.string,
  availableDataSources: PropTypes.array.isRequired,
}

InsightPlatformSelectors.defaultProps = {
  currentPlatform: '',
  currentDataSource: '',
  defaultPlatform: '',
  defaultDataSource: '',
}


export default InsightPlatformSelectors
