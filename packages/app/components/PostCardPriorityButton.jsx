import React from 'react'
import PropTypes from 'prop-types'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import TooltipButton from '@/elements/TooltipButton'

import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'

import copy from '@/app/copy/PostsPageCopy'

import brandColors from '@/constants/brandColors'
import PostCardPriorityButtonAlert from '@/app/PostCardPriorityButtonAlert'

const PostCardPriorityButton = ({
  postId,
  artistId,
  priorityEnabled,
  updatePost,
  postIndex,
  promotionStatus,
}) => {
  // Store INTERNAL STATE based on priorityEnabled
  const [currentState, setCurrentState] = React.useState(priorityEnabled)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const isPostActive = promotionStatus === 'active'
  const isPostArchived = promotionStatus === 'archived'
  const isDisabled = isPostActive && !currentState
  const slides = copy.prioritizeTooltipSlides

  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(priorityEnabled)
  }, [priorityEnabled])

  const handlePostPriority = async () => {
    const { res: updatedPost, error } = await postsHelpers.setPostPriority({ artistId, assetId: postId, priorityEnabled })
    // Return early if erroring
    if (error) {
      return
    }
    // Update post list state
    const { priority_enabled } = updatedPost
    const payload = { postIndex, priorityEnabled: priority_enabled }
    updatePost('toggle-priority', payload)
  }

  return (
    <div className="flex items-center ml-2">
      <TooltipButton
        buttonClasses="-my-2 -mr-1"
        slides={slides}
      />
      {/* PRIORITY BUTTON */}
      <button
        type="button"
        onClick={() => {
          setShouldShowAlert(true)
        }}
        className={isDisabled ? 'opacity-25 cursor-default' : ''}
        disabled={isDisabled}
      >
        <ChevronDoubleUpIcon
          fill={currentState ? brandColors.red : 'none'}
          stroke={currentState ? brandColors.red : brandColors.black}
          className="w-5 h-5"
        />
      </button>
      {/* ALERT */}
      <PostCardPriorityButtonAlert
        show={shouldShowAlert}
        onAlertConfirm={handlePostPriority}
        onCancel={() => {
          setShouldShowAlert(false)
        }}
        isPostPrioritized={currentState}
        isPostArchived={isPostArchived}
      />
    </div>
  )
}

PostCardPriorityButton.propTypes = {
  priorityEnabled: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
}

PostCardPriorityButton.defaultProps = {
}

export default PostCardPriorityButton