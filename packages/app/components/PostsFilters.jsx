import React from 'react'
import PropTypes from 'prop-types'

import PostsFilter from '@/app/PostsFilter'

import { filterTypes } from '@/app/helpers/postsHelpers'

const PostsFilters = ({ initialFilters, setFiltersState }) => {
  return (
    <div>
      <h2 className="mb-8">Posts Filters</h2>
      {filterTypes.map((filterType) => {
        const { title, slug } = filterType

        return (
          <PostsFilter
            key={title}
            title={title}
            filterType={filterType}
            initialFilters={initialFilters[slug]}
            setFiltersState={setFiltersState}
          />
        )
      })}
    </div>
  )
}

PostsFilters.propTypes = {
  initialFilters: PropTypes.shape({
    status: PropTypes.array.isRequired,
    platform: PropTypes.array.isRequired,
    postType: PropTypes.array.isRequired,
  }).isRequired,
  setFiltersState: PropTypes.func.isRequired,
}

PostsFilters.defaultProps = {
}

export default PostsFilters
