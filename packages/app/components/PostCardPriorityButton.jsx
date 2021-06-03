import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'

import brandColors from '@/constants/brandColors'

const PostCardPriorityButton = ({ priorityEnabled }) => {
  // Store INTERNAL STATE based on priorityEnabled
  const [currentState, setCurrentState] = React.useState(priorityEnabled)
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(priorityEnabled)
  }, [priorityEnabled])

  const handlePostPriority = () => {
    setCurrentState(!currentState)
  }

  return (
    <div className="flex items-center">
      <TooltipButton
        buttonClasses="-my-2 -mr-1"
        slides={['Some explanation about prioritising posts']}
      />
      <a
        role="button"
        onClick={handlePostPriority}
      >
        <ChevronDoubleUpIcon
          fill={currentState ? brandColors.instagram.bg : 'none'}
          stroke={currentState ? brandColors.instagram.bg : brandColors.black}
          className="w-5 h-5"
        />
      </a>
    </div>
  )
}

PostCardPriorityButton.propTypes = {
  priorityEnabled: PropTypes.bool.isRequired,
}

PostCardPriorityButton.defaultProps = {
}

export default PostCardPriorityButton
