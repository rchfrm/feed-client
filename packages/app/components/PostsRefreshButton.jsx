import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import RefreshIcon from '@/icons/RefreshIcon'

import brandColors from '@/constants/brandColors'

const PostsRefreshButton = ({ refreshPosts, className }) => {
  return (
    <Button
      onClick={refreshPosts}
      version="black small icon"
      className={[className].join(' ')}
    >
      <RefreshIcon fill={brandColors.bgColor} />
      Refresh
    </Button>
  )
}

PostsRefreshButton.propTypes = {
  refreshPosts: PropTypes.func,
  className: PropTypes.string,
}

PostsRefreshButton.defaultProps = {
  refreshPosts: () => {},
  className: null,
}


export default PostsRefreshButton
