import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

import brandColors from '@/constants/brandColors'

const FILTER_BUTTON_ICON = ({ backgroundColor }) => {
  return (
    <div style={{ backgroundColor }} className="icon rounded-full h-3 w-3" />
  )
}

const PostsFilters = ({
  postTypes,
  currentPostType,
  setCurrentPostType,
}) => {
  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return postTypes.map(({ id, title, color, activeTextColor }) => {
      // Get icon color
      const backgroundColor = id === currentPostType ? brandColors.white : color
      const icon = id === 'all' ? null : <FILTER_BUTTON_ICON backgroundColor={backgroundColor} />
      return {
        id,
        title,
        icon,
        color,
        activeTextColor,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPostType])
  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentPostType}
      setActiveOptionId={setCurrentPostType}
      labelText="Select a Post state"
    />
  )
}

PostsFilters.propTypes = {
  postTypes: PropTypes.array.isRequired,
  currentPostType: PropTypes.string.isRequired,
  setCurrentPostType: PropTypes.func.isRequired,
}

export default PostsFilters
