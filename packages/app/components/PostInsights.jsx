import React from 'react'
import PropTypes from 'prop-types'

const PostInsights = ({ post }) => {
  return (
    <>
      <h2>Post insights</h2>
      <p>Post ID: {post?.id}</p>
    </>
  )
}

PostInsights.propTypes = {
  post: PropTypes.object.isRequired,
}

PostInsights.defaultProps = {
}

export default PostInsights
