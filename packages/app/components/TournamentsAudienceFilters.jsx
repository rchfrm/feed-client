import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/tournamentsCopy'

const FILTER_BUTTON_ICON = ({ backgroundColor }) => {
  return (
    <div style={{ backgroundColor }} className="icon rounded-full h-3 w-3" />
  )
}

const TournamentsAudienceFilters = ({
  audienceTypes,
  currentAudienceType,
  setCurrentAudienceType,
}) => {
  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return audienceTypes.map(({ id, title, color, activeTextColor }) => {
      // Get icon color
      const backgroundColor = id === currentAudienceType ? brandColors.white : color
      const icon = <FILTER_BUTTON_ICON backgroundColor={backgroundColor} />
      return {
        id,
        title,
        icon,
        color,
        activeTextColor,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudienceType])

  // GET TOOLTIP SLIDES
  const tooltipSlides = React.useMemo(() => {
    console.log('audienceTypes', audienceTypes)
    return audienceTypes.reduce((slides, { id, title }) => {
      const getMarkdown = copy.filterTooltips[id]
      if (!getMarkdown) return slides
      const markdown = getMarkdown(title)
      return [...slides, markdown]
    }, [])
  }, [audienceTypes])

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentAudienceType}
      setActiveOptionId={setCurrentAudienceType}
      labelText="Select an audience type"
      tooltipSlides={tooltipSlides}
      tooltipDirection="bottom"
    />
  )
}

TournamentsAudienceFilters.propTypes = {
  audienceTypes: PropTypes.array.isRequired,
  currentAudienceType: PropTypes.string.isRequired,
  setCurrentAudienceType: PropTypes.func.isRequired,
}

export default TournamentsAudienceFilters
