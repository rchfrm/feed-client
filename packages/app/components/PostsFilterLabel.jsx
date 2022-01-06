import React from 'react'
import PropTypes from 'prop-types'

const PostsFilterLabel = ({ title, filters }) => {
  return (
    <div>
      <span
        className="inline-block mr-2 text-sm leading-3 bg-black text-white"
        style={{ padding: '2px' }}
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
