import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import copy from '@/app/copy/PostsPageCopy'


const PostToggleTooltip = ({ promotionStatus }) => {
  const slides = copy.toggleTooltipSlides[promotionStatus]
  return (
    <TooltipButton
      buttonClasses="ml-1 -mr-4"
      direction="left"
      slides={slides}
      messageStyle={{
        zIndex: 4,
      }}
    />
  )
}

PostToggleTooltip.propTypes = {
  promotionStatus: PropTypes.string.isRequired,
}

export default PostToggleTooltip
