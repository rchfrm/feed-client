import React from 'react'
import PropTypes from 'prop-types'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import ChevronDoubleUpCircleIcon from '@/icons/ChevronDoubleUpCircleIcon'

import brandColors from '@/constants/brandColors'
import PostCardPriorityButtonAlert from '@/app/PostCardPriorityButtonAlert'

import { updatePost } from '@/app/helpers/postsHelpers'

const PostCardPriorityButton = ({
  postId,
  artistId,
  priorityEnabled,
  updatePost: updatePostsState,
  toggleCampaign,
  postIndex,
  promotionStatus,
}) => {
  // Store INTERNAL STATE based on priorityEnabled
  const [currentState, setCurrentState] = React.useState(priorityEnabled)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const isPostActive = promotionStatus === 'active'
  const isPostArchived = promotionStatus === 'archived'
  const isDisabled = isPostActive && !currentState

  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(priorityEnabled)
  }, [priorityEnabled])

  const checkAndOptIn = React.useCallback(async ({
    promotion_enabled,
    conversions_enabled,
    priority_enabled,
  }) => {
    const campaignType = 'all'
    // Opt in post for Grow & Nurture if prioritized and Grow & Nurture and Conversions are both opted out
    if (priority_enabled && !promotion_enabled && !conversions_enabled) {
      const { res: updatedPost } = await updatePost({ artistId, postId, promotionEnabled: true, campaignType })

      // Update post list state
      const { promotion_enabled, promotable_status } = updatedPost
      toggleCampaign(promotion_enabled, promotable_status, campaignType, postId)
    }
  }, [artistId, postId, toggleCampaign])

  const handlePostPriority = async () => {
    const { res: updatedPost, error } = await postsHelpers.setPostPriority({ artistId, assetId: postId, priorityEnabled })
    // Return early if erroring
    if (error) {
      return
    }
    // Update post list state
    const { priority_enabled } = updatedPost
    const payload = { postIndex, priorityEnabled: priority_enabled }
    updatePostsState('toggle-priority', payload)
    checkAndOptIn(updatedPost)
  }

  return (
    <div className="flex items-center">
      {/* PRIORITY BUTTON */}
      <button
        type="button"
        onClick={() => {
          setShouldShowAlert(true)
        }}
        className={isDisabled ? 'opacity-25 cursor-default' : ''}
        disabled={isDisabled}
      >
        <ChevronDoubleUpCircleIcon
          fill={currentState ? brandColors.instagram.bg : brandColors.white}
          stroke={currentState ? brandColors.white : brandColors.greyDark}
          className="w-6 h-6"
        />
      </button>
      {/* ALERT */}
      {shouldShowAlert && (
        <PostCardPriorityButtonAlert
          show={shouldShowAlert}
          onAlertConfirm={handlePostPriority}
          onCancel={() => {
            setShouldShowAlert(false)
          }}
          isPostPrioritized={currentState}
          isPostArchived={isPostArchived}
        />
      )}
    </div>
  )
}

PostCardPriorityButton.propTypes = {
  priorityEnabled: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
}

PostCardPriorityButton.defaultProps = {
}

export default PostCardPriorityButton
