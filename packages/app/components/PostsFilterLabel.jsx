import React from 'react'
import PropTypes from 'prop-types'

const PostsFilterLabel = ({ name }) => {
  return (
    <div>
      <span
        className="mr-2 bg-black text-white text-sm"
        style={{ padding: '1px' }}
      >
        2
      </span>
      {name}
    </div>
  )
}

PostsFilterLabel.propTypes = {
  name: PropTypes.string.isRequired,
}

PostsFilterLabel.defaultProps = {
}

export default PostsFilterLabel
