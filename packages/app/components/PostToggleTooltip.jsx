import React from 'react'

import TooltipButton from '@/elements/TooltipButton'

import copy from '@/app/copy/PostsPageCopy'

const getSlides = () => {
  const slides = copy.toggleTooltipSlides
  return { slides, slidesContentAfter: [] }
}

const PostToggleTooltip = () => {
  const { slides, slidesContentAfter } = getSlides()
  return (
    <TooltipButton
      buttonClasses="ml-1 -mr-4"
      direction="left"
      slides={slides}
      slidesContentAfter={slidesContentAfter}
      messageStyle={{
        zIndex: 4,
      }}
    />
  )
}

export default PostToggleTooltip
