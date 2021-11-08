import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

import copy from '@/app/copy/PostsPageCopy'
import brandColors from '@/constants/brandColors'

const FILTER_BUTTON_ICON = ({ backgroundColor }) => {
  return (
    <div style={{ backgroundColor }} className="icon rounded-full h-3 w-3" />
  )
}

const PostsFilters = ({
  postTypes,
  currentPostType,
  defaultPostState,
  setCurrentPostType,
  disabled,
  className,
}) => {
  // Build options array for base filters
  const baseFiltersOptions = React.useMemo(() => {
    return postTypes.map(({ id, slug, title, color, activeTextColor }) => {
      // Get icon color
      const backgroundColor = id === currentPostType ? brandColors.white : color
      const icon = id === 'all' ? null : <FILTER_BUTTON_ICON backgroundColor={disabled ? brandColors.black : backgroundColor} />
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
  }, [currentPostType])

  // GET TOOLTIP SLIDES
  const tooltipSlides = React.useMemo(() => {
    return postTypes.reduce((slides, { id, title }) => {
      const getMarkdown = copy.filterTooltips[id]
      if (!getMarkdown) return slides
      const markdown = getMarkdown(title)
      return [...slides, markdown]
    }, [])
  }, [postTypes])

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentPostType}
      defaultOptionId={defaultPostState}
      setActiveOptionId={setCurrentPostType}
      labelText="Filter by post status"
      tooltipSlides={tooltipSlides}
      tooltipDirection="bottom"
      useSetQuery
      useSetLocalStorage
      useSlug
      querySlug="postStatus"
      trackProps={{
        action: 'adjust_filter',
        page: 'posts',
      }}
      disabled={disabled}
      className={className}
    />
  )
}

PostsFilters.propTypes = {
  postTypes: PropTypes.array.isRequired,
  currentPostType: PropTypes.string.isRequired,
  defaultPostState: PropTypes.string.isRequired,
  setCurrentPostType: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostsFilters.defaultProps = {
  disabled: PropTypes.false,
  className: null,
}

export default PostsFilters
