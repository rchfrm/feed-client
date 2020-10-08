import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

import brandColors from '@/constants/brandColors'

const FILTER_BUTTON_ICON = ({ backgroundColor }) => {
  return (
    <div style={{ backgroundColor }} className="icon rounded-full h-3 w-3" />
  )
}

const TournamentsAudienceFilters = ({
  audienceTypes,
  currentAudienceType,
  defaultAudienceType,
  setCurrentAudienceType,
}) => {
  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return audienceTypes.map(({ id, title, slug, color, activeTextColor }) => {
      // Get icon color
      const backgroundColor = id === currentAudienceType ? brandColors.white : color
      const icon = <FILTER_BUTTON_ICON backgroundColor={backgroundColor} />
      return {
        id,
        slug,
        title,
        icon,
        color,
        activeTextColor,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudienceType])
  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentAudienceType}
      defaultOptionId={defaultAudienceType}
      setActiveOptionId={setCurrentAudienceType}
      labelText="Select an audience type"
      useSetQuery
      useSetLocalStorage
      useSlug
      querySlug="audience"
    />
  )
}

TournamentsAudienceFilters.propTypes = {
  audienceTypes: PropTypes.array.isRequired,
  currentAudienceType: PropTypes.string.isRequired,
  defaultAudienceType: PropTypes.string.isRequired,
  setCurrentAudienceType: PropTypes.func.isRequired,
}

export default TournamentsAudienceFilters
