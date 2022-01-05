import React from 'react'
import PropTypes from 'prop-types'

import PostsFilterOptionsItem from '@/app/PostsFilterOptionsItem'

const PostsFilterOptions = ({ setFilters, filterType }) => {
  const { slug, options } = filterType

  return (
    <div className={[
      'absolute bottom-0',
      'px-4 py-2',
    ].join(' ')}
    >
      {options.map(({ slug: optionSlug, title }) => (
        <PostsFilterOptionsItem
          key={optionSlug}
          title={title}
          type={slug}
          value={optionSlug}
          setFilters={setFilters}
        />
      ))}
    </div>
  )
}

PostsFilterOptions.propTypes = {
  setFilters: PropTypes.func.isRequired,
  filterType: PropTypes.array.isRequired,
}

PostsFilterOptions.defaultProps = {
}

export default PostsFilterOptions
