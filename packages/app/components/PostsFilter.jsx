import React from 'react'
import PropTypes from 'prop-types'
import PostsFilterOption from '@/app/PostsFilterOption'
import { filterTypes } from '@/app/helpers/postsHelpers'

const PostsFilter = ({
  filterBy,
  setFilterBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 md:mb-0">
      <p className="mb-1 sm:mb-0 font-bold">Show:</p>
      {filterTypes.map(({ type, options }) => (
        <div
          key={type}
          className={[
            'flex items-center mb-2 sm:mb-0 sm:px-2',
            'last:pt-2 last:mb-0 sm:last:pt-0 last:border-t last:border-solid last:border-grey',
            'sm:last:border-l sm:last:border-t-0',
          ].join(' ')}
        >
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
