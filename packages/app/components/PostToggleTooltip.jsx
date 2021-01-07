import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import copy from '@/app/copy/PostsPageCopy'


const PostToggleTooltip = ({ promotionStatus }) => {
  const slides = copy.toggleTooltipSlides[promotionStatus]
  return (
    <TooltipButton
      buttonClasses="mr-1"
      direction="left"
      slides={slides}
      messageStyle={{
        zIndex: 4,
      }}
      label="Post toggle"
    />
  )
}

PostToggleTooltip.propTypes = {
  promotionStatus: PropTypes.string.isRequired,
}

export default PostToggleTooltip
