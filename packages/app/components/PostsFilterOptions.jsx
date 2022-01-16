import React from 'react'
import PropTypes from 'prop-types'

import PostsFilterOptionsItem from '@/app/PostsFilterOptionsItem'

const PostsFilterOptions = ({
  filters,
  filterType,
  addFilter,
  removeFilter,
  setFiltersState,
}) => {
  const { options } = filterType

  return (
    <div className={[
      'absolute bottom-0',
      'px-2 xs:px-4 py-2',
    ].join(' ')}
    >
      {options.map(({ slug: optionSlug, title }) => (
        <PostsFilterOptionsItem
          key={optionSlug}
          title={title}
          value={optionSlug}
          filters={filters}
          filterType={filterType}
          addFilter={addFilter}
          removeFilter={removeFilter}
          setFiltersState={setFiltersState}
        />
      ))}
    </div>
  )
}

PostsFilterOptions.propTypes = {
  filters: PropTypes.array.isRequired,
  filterType: PropTypes.object.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  setFiltersState: PropTypes.func.isRequired,
}

PostsFilterOptions.defaultProps = {
}

export default PostsFilterOptions
