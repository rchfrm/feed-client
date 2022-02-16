import React from 'react'
import PropTypes from 'prop-types'

import PostsFilterOptionsItem from '@/app/PostsFilterOptionsItem'

const PostsFilterOptions = ({
  filters,
  filterType,
  addFilter,
  removeFilter,
  setFiltersState,
  isOpen,
}) => {
  const { options } = filterType

  return (
    <div
      className={[
        'top-0',
        'px-2 xs:px-4 py-2',
        isOpen ? 'relative overflow-auto' : 'absolute overflow-hidden',
      ].join(' ')}
      style={{
        height: isOpen ? '100%' : '40px',
      }}
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
  isOpen: PropTypes.bool.isRequired,
}

PostsFilterOptions.defaultProps = {
}

export default PostsFilterOptions
