import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

const PostsSorter = ({
  sortTypes,
  sortBy,
  setSortBy,
  defaultSortState,
  className,
}) => {
  return (
    <BaseFilters
      options={sortTypes}
      activeOptionId={sortBy}
      defaultOptionId={defaultSortState}
      setActiveOptionId={setSortBy}
      labelText="Sort"
      useSetQuery
      useSetLocalStorage
      useSlug
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
  sortTypes: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  defaultSortState: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostsSorter.defaultProps = {
  className: null,
}

export default PostsSorter
