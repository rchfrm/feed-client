import React from 'react'
import PropTypes from 'prop-types'

import PostCardLabel from '@/app/PostCardLabel'

import ToggleSwitch from '@/elements/ToggleSwitch'
import PostCardDisableHandler from '@/app/PostCardDisableHandler'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import { updatePost, setPostPriority, growthGradient } from '@/app/helpers/postsHelpers'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled }) => {
  return updatePost({ artistId, postId, promotionEnabled })
}

const PostCardToggle = ({
  post,
  postToggleSetterType,
  postIndex,
  artistId,
  isEnabled,
  toggleCampaign,
  updatePost: updatePostsState,
  isActive,
  disabled,
  showAlertModal,
  className,
}) => {
  // Store INTERNAL STATE based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(isEnabled)
  const { sidePanelOpen } = React.useContext(SidePanelContext)
  const { id: postId, postPromotable, promotionStatus, priorityEnabled } = post
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(isEnabled)
  }, [isEnabled])

  // UPDATE ON SERVER
  const [isLoading, setIsLoading] = React.useState(false)

  const checkAndDeprioritize = React.useCallback(async ({
    promotion_enabled,
    conversions_enabled,
  }) => {
    // Deprioritize post if opted out for Grow & Nurture and Conversions and post is prioritized
    if (priorityEnabled && !promotion_enabled && !conversions_enabled) {
      const { res: updatedPost } = await setPostPriority({ artistId, assetId: postId, priorityEnabled })

      // Update post list state
      const { priority_enabled } = updatedPost
      const payload = { postIndex, priorityEnabled: priority_enabled }
      updatePostsState('toggle-priority', payload)
    }
  }, [artistId, postId, postIndex, priorityEnabled, updatePostsState])

  // ON CHANGING THE TOGGLE SWITCH
  const onChange = React.useCallback(async (newState) => {
    // Start loading
    setIsLoading(true)
    // Update state passed to toggle component
    setCurrentState(newState)
    const { res: updatedPost, error } = await runChangeState({ artistId, postId, promotionEnabled: newState })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setCurrentState(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, promotable_status } = updatedPost
    toggleCampaign(postId, promotion_enabled, promotable_status)
    checkAndDeprioritize(updatedPost)
  }, [artistId, postId, toggleCampaign, checkAndDeprioritize])

  return (
    <div
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue bg-grey-1',
        showAlertModal ? 'border-2 border-solid border-red' : null,
        className,
      ].join(' ')}
    >
      <div className="mb-0 flex items-center">
        {/* DOT */}
        <div
          className={[
            'w-4 h-4 rounded-full',
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={{
            background: growthGradient,
          }}
        />
        {/* TITLE */}
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          Promotable
        </strong>
        {/* RUNNING LABEL */}
        {isActive && (
          <PostCardLabel
            copy="running"
          />
        )}
      </div>
      <div>
        <ToggleSwitch
          state={currentState}
          onChange={onChange}
          isLoading={isLoading}
          disabled={disabled}
        />
      </div>
      {/* DISABLE ALERT */}
      {!sidePanelOpen && postPromotable && promotionStatus === 'active' && (
        <PostCardDisableHandler
          post={post}
          postToggleSetterType={postToggleSetterType}
          artistId={artistId}
          toggleCampaign={toggleCampaign}
          isEnabled={currentState}
          setIsEnabled={setCurrentState}
        />
      )}
    </div>
  )
}

PostCardToggle.propTypes = {
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  showAlertModal: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
  isEnabled: false,
  isActive: false,
  showAlertModal: false,
}

export default PostCardToggle
