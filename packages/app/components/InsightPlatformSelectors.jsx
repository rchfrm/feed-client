import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
import ShowInsightsButton from '@/app/ShowInsightsButton'
import PlatformIcon from '@/icons/PlatformIcon'
// Constants
import brandColors from '@/constants/brandColors'
import styles from '@/BaseFilters.module.css'

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
      const icon = <PlatformIcon fill={iconColor} platform={id} />
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
      querySlug="platform"
      className="items-center"
    >
      <ShowInsightsButton
        className={[styles.buttonContainer, styles.buttonPill_container].join(' ')}
        text="+ Add more"
      />
    </BaseFilters>
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
