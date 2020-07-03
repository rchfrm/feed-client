import React from 'react'

import ButtonTooltip from '@/elements/ButtonTooltip'
import ToggleButtonIcon from '@/icons/ToggleButtonIcon'

import copy from '@/app/copy/PostsPageCopy'

const toggleButtonIcon = (state, defaultState) => {
  return (
    <ToggleButtonIcon state={state} defaultState={defaultState} />
  )
}

const PostToggleTooltip = () => {
  return (
    <ButtonTooltip
      buttonClasses="ml-1 -mr-4"
      slides={copy.toggleTooltipSlides}
      slidesContentAfter={[
        null,
        <div key="default" className="flex mb-4 items-center">
          {toggleButtonIcon('default', 'on')}
          <span className="block pr-3 pl-3"> / </span>
          {toggleButtonIcon('default', 'off')}
        </div>,
        <div key="on" className="mb-4">
          {toggleButtonIcon('on')}
        </div>,
        <div key="off" className="mb-4">
          {toggleButtonIcon('off')}
        </div>,
        null,
      ]}
      containerStyle={{
        zIndex: 3,
      }}
    />
  )
}

export default PostToggleTooltip
