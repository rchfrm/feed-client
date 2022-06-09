import React from 'react'
import PropTypes from 'prop-types'

const PostSettings = ({ post }) => {
  return (
    <>
      <h2>Promotion settings</h2>
      <p>Post ID: {post?.id}</p>
    </>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object.isRequired,
}

PostSettings.defaultProps = {
}

export default PostSettings
