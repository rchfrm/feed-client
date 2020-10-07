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
  setCurrentPlatform,
  defaultPlatform,
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

  if (!defaultPlatform) return null

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentPlatform}
      defaultOptionId={defaultPlatform}
      setActiveOptionId={setCurrentPlatform}
      labelText="Select a platform"
      useSetQuery
      useSetLocalStorage
      queryTitle="insightPlatform"
    />
  )
}

InsightPlatformSelectors.propTypes = {
  availablePlatforms: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string,
  setCurrentPlatform: PropTypes.func.isRequired,
  defaultPlatform: PropTypes.string,
}

InsightPlatformSelectors.defaultProps = {
  defaultPlatform: '',
  currentPlatform: '',
}


export default InsightPlatformSelectors
