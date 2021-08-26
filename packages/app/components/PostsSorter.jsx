import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

const PostsSorter = ({
  sortTypes,
  currentSortType,
  setCurrentSortType,
  defaultPostState,
  className,
}) => {
  return (
    <BaseFilters
      options={sortTypes}
      activeOptionId={currentSortType}
      defaultOptionId={defaultPostState}
      setActiveOptionId={setCurrentSortType}
      labelText="Sort"
      useSetQuery
      useSetLocalStorage
      useSlug
      tooltipSlides={[]}
      querySlug="sortBy"
      trackProps={{
        action: 'adjust_sort',
        page: 'posts',
      }}
      className={className}
    />
  )
}

PostsSorter.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  setCurrentSortType: PropTypes.func.isRequired,
  defaultPostState: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostsSorter.defaultProps = {
  className: null,
}

export default PostsSorter
