import React from 'react'
import PropTypes from 'prop-types'

// Components
import BaseFilters from '@/BaseFilters'
import ShowIntegrationsButton from '@/app/ShowIntegrationsButton'
import PlatformIcon from '@/icons/PlatformIcon'
// Constants
import brandColors from '@/constants/brandColors'
import styles from '@/BaseFilters.module.css'

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

  // Update data source when changing platform
  React.useEffect(() => {
    if (! currentDataSource) return
    const { platform } = availableDataSources.find(({ name }) => name === currentDataSource) || {}
    if (platform === currentPlatform) return
    setCurrentDataSource(defaultDataSource)
  // eslint-disable-next-line
  }, [currentPlatform, defaultDataSource, availableDataSources])

  if (! defaultPlatform) return null

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentPlatform}
      defaultOptionId={defaultPlatform}
      setActiveOptionId={setCurrentPlatform}
      labelText="Select a platform"
      className="items-center"
      trackProps={{
        action: 'adjust_filter',
        page: 'insights',
      }}
    >
      <ShowIntegrationsButton
        className={[styles.buttonContainer, styles.buttonPill_container].join(' ')}
        text="+"
        circleButton
      />
    </BaseFilters>
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
