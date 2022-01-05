import React from 'react'
import PropTypes from 'prop-types'

const PostsFilterLabel = ({ title, filters }) => {
  return (
    <div>
      <span
        className="mr-2 bg-black text-white text-sm"
        style={{ padding: '1px' }}
      >
        {filters.length}
      </span>
      {title}
    </div>
  )
}

PostsFilterLabel.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
}

PostsFilterLabel.defaultProps = {
}

export default PostsFilterLabel
