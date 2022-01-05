import React from 'react'
import PropTypes from 'prop-types'

import PostsFilter from '@/app/PostsFilter'

import { filterTypes } from '@/app/helpers/postsHelpers'

const PostsFilters = ({ filters, setFilters }) => {
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
            filters={filters[slug]}
            setFilters={setFilters}
          />
        )
      })}
    </div>
  )
}

PostsFilters.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.array.isRequired,
    platform: PropTypes.array.isRequired,
    postType: PropTypes.array.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
}

PostsFilters.defaultProps = {
}

export default PostsFilters
