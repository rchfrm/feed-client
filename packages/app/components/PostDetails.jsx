import React from 'react'
import PropTypes from 'prop-types'

const PostDetails = ({ post }) => {
  return (
    <>
      <h2>Source post details</h2>
      <p>Post ID: {post?.id}</p>
    </>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
}

PostDetails.defaultProps = {
}

export default PostDetails
