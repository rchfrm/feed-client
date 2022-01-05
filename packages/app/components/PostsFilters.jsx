import React from 'react'

import PostsFilter from '@/app/PostsFilter'


const PostsFilters = () => {
  return (
    <div>
      <h2 className="mb-8">Posts Filters</h2>
      <PostsFilter name="Status" />
      <PostsFilter name="Platform" />
      <PostsFilter name="Post Type" />
    </div>
  )
}

PostsFilters.propTypes = {
}

PostsFilters.defaultProps = {
}

export default PostsFilters
