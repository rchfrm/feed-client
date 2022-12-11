import React from 'react'
import PropTypes from 'prop-types'
import PostsFilterOption from '@/app/PostsFilterOption'
import { filterTypes } from '@/app/helpers/postsHelpers'

const PostsFilter = ({
  filterBy,
  setFilterBy,
}) => {
  return (
    <div className="flex items-center">
      <p className="mb-0 font-bold">Show:</p>
      {filterTypes.map(({ type, options }) => (
        <div key={type} className="flex items-center last:border-l last:border-solid last:border-grey-2 px-3">
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
  )
}

PostsFilter.propTypes = {
  filterBy: PropTypes.object.isRequired,
  setFilterBy: PropTypes.func.isRequired,
}

export default PostsFilter
