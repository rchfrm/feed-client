import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

const PostsSorter = ({
  sortTypes,
  sortBy,
  setSortBy,
  defaultSortState,
  disabled,
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
      disabled={disabled}
      className={className}
    />
  )
}

PostsSorter.propTypes = {
  sortTypes: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  defaultSortState: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostsSorter.defaultProps = {
  disabled: false,
  className: null,
}

export default PostsSorter
