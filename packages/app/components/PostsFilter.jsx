import React from 'react'
import PropTypes from 'prop-types'
import PostsFilterOption from '@/app/PostsFilterOption'
import { filterTypes } from '@/app/helpers/postsHelpers'

const PostsFilter = ({
  filterBy,
  setFilterBy,
}) => {
  return (
    <div className="flex justify-between mb-5 text-xs">
      <div className="flex items-center">
        <p className="mb-0 font-bold">Show:</p>
        {filterTypes.map(({ type, options }) => (
          <div key={type} className="flex items-center px-3">
            {options.map(({ slug, title }) => {
              return (
                <PostsFilterOption
                  key={slug}
                  title={title}
                  type={type}
                  slug={slug}
                  setFilterBy={setFilterBy}
                  filterBy={filterBy}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div>
        <p className="mb-0 font-bold">Sort: </p>
      </div>
    </div>
  )
}

PostsFilter.propTypes = {
  filterBy: PropTypes.object.isRequired,
  setFilterBy: PropTypes.func.isRequired,
}

export default PostsFilter
