import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import copy from '@/app/copy/PostsPageCopy'

const PostsConnectionsTooltip = ({ className }) => {
  return (
    <TooltipButton
      buttonClasses={className}
      buttonText="Help"
      slides={copy.globalConnectionsTooltipSlides}
      direction="right"
    />
  )
}

PostsConnectionsTooltip.propTypes = {
  className: PropTypes.string,
}

PostsConnectionsTooltip.defaultProps = {
  className: '',
}


export default PostsConnectionsTooltip
