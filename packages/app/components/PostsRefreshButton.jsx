import React from 'react'
import PropTypes from 'prop-types'

import RefreshIcon from '@/icons/RefreshIcon'

import brandColors from '@/constants/brandColors'

const PostsRefreshButton = ({ refreshPosts, className, style }) => {
  return (
    <button
      onClick={refreshPosts}
      className={['w-8 pl-3', className].join(' ')}
      arial-label="Refresh Posts"
      title="Refresh Posts"
      style={style}
    >
      <RefreshIcon
        className={['w-full h-auto'].join(' ')}
        fill={brandColors.textColor}
        style={{ marginRight: 0 }}
      />
    </button>
  )
}

PostsRefreshButton.propTypes = {
  refreshPosts: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsRefreshButton.defaultProps = {
  refreshPosts: () => {},
  className: null,
  style: null,
}


export default PostsRefreshButton
