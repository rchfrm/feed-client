import React from 'react'
import PropTypes from 'prop-types'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import TooltipButton from '@/elements/TooltipButton'

import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'

import brandColors from '@/constants/brandColors'
import PostCardConfirmPriorityAlert from '@/app/PostCardConfirmPriorityAlert'

const PostCardPriorityButton = ({
  postId,
  artistId,
  priorityEnabled,
}) => {
  // Store INTERNAL STATE based on priorityEnabled
  const [currentState, setCurrentState] = React.useState(priorityEnabled)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)

  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(priorityEnabled)
  }, [priorityEnabled])

  const handlePostPriority = async () => {
    const { res: updatedPost, error } = await postsHelpers.updatePostPriority({ artistId, assetId: postId, priorityEnabled })
    // Return early if erroring
    if (error) {
      return
    }
    setCurrentState(!currentState)
    // Update post list state
    const { priority_enabled } = updatedPost
    // Call parent function to update posts store state
    console.log(priority_enabled)
  }

  return (
    <div className="flex items-center ml-2">
      <TooltipButton
        buttonClasses="-my-2 -mr-1"
        slides={['Some explanation about prioritising posts']}
      />
      {/* PRIORITY BUTTON */}
      <a
        role="button"
        onClick={() => {
          setShouldShowAlert(true)
        }}
      >
        <ChevronDoubleUpIcon
          fill={currentState ? brandColors.red : 'none'}
          stroke={currentState ? brandColors.red : brandColors.black}
          className="w-5 h-5"
        />
      </a>
      {/* ALERT */}
      <PostCardConfirmPriorityAlert
        show={shouldShowAlert}
        onAlertConfirm={handlePostPriority}
        onCancel={() => {
          setShouldShowAlert(false)
        }}
      />
    </div>
  )
}

PostCardPriorityButton.propTypes = {
  priorityEnabled: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
}

PostCardPriorityButton.defaultProps = {
}

export default PostCardPriorityButton
