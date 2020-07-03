import React from 'react'

import ButtonTooltip from '@/elements/ButtonTooltip'

import copy from '@/app/copy/PostsPageCopy'

const PostToggleTooltip = () => {
  return (
    <ButtonTooltip
      buttonClasses="ml-1 -mr-4"
      slides={copy.toggleTooltipSlides}
      containerStyle={{
        zIndex: 3,
      }}
    />
  )
}

export default PostToggleTooltip
