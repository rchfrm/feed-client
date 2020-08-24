import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'
import ToggleButtonIcon from '@/icons/ToggleButtonIcon'

import copy from '@/app/copy/PostsPageCopy'

const getToggleButtonIcon = (state, defaultState) => {
  return (
    <ToggleButtonIcon state={state} defaultState={defaultState} />
  )
}

const getSlides = (postToggleType) => {
  const slides = copy.toggleTooltipSlides[postToggleType]
  if (postToggleType === 'triple') {
    return {
      slides,
      slidesContentAfter: [
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
      ],
    }
  }
  return { slides, slidesContentAfter: [] }
}

const PostToggleTooltip = ({ postToggleType }) => {
  const { slides, slidesContentAfter } = getSlides(postToggleType)
  return (
    <TooltipButton
      buttonClasses="ml-1 -mr-4"
      slides={slides}
      slidesContentAfter={slidesContentAfter}
      buttonStyle={{
        zIndex: 4,
      }}
    />
  )
}

PostToggleTooltip.propTypes = {
  postToggleType: PropTypes.string.isRequired,
}

export default PostToggleTooltip
