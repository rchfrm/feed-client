import React from 'react'

import TooltipButton from '@/elements/TooltipButton'
import ToggleButtonIcon from '@/icons/ToggleButtonIcon'

import copy from '@/app/copy/PostsPageCopy'

const getToggleButtonIcon = (state, defaultState) => {
  return (
    <ToggleButtonIcon state={state} defaultState={defaultState} />
  )
}

const PostToggleTooltip = () => {
  return (
    <TooltipButton
      buttonClasses="ml-1 -mr-4"
      slides={copy.toggleTooltipSlides}
      slidesContentAfter={[
        null,
        <div key="default" className="flex mb-4 items-center">
          {getToggleButtonIcon('default', 'on')}
          <span className="block pr-3 pl-3"> / </span>
          {getToggleButtonIcon('default', 'off')}
        </div>,
        <div key="on" className="mb-4">
          {getToggleButtonIcon('on')}
        </div>,
        <div key="off" className="mb-4">
          {getToggleButtonIcon('off')}
        </div>,
        null,
      ]}
      buttonStyle={{
        zIndex: 3,
      }}
    />
  )
}

export default PostToggleTooltip
