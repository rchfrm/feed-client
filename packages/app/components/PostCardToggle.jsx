import React from 'react'
import PropTypes from 'prop-types'

import PostCardLabel from '@/app/PostCardLabel'

import ToggleSwitch from '@/elements/ToggleSwitch'
import PostCardToggleTeaser from '@/app/PostCardToggleTeaser'
import PostCardDisableHandler from '@/app/PostCardDisableHandler'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import useShowConversionsInterest from '@/app/hooks/useShowConversionsInterest'

import { updatePost, setPostPriority, growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled, campaignType }) => {
  return updatePost({ artistId, postId, promotionEnabled, campaignType })
}

const PostCardToggle = ({
  post,
  postToggleSetterType,
  postIndex,
  campaignType,
  artistId,
  isEnabled,
  toggleCampaign,
  updatePost: updatePostsState,
  isActive,
  disabled,
  isFeatureEnabled,
  className,
}) => {
  // Store INTERNAL STATE based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(isEnabled)
  const isConversionsCampaign = campaignType === 'conversions'
  const { sidePanelOpen } = React.useContext(SidePanelContext)
  const { id: postId, postPromotable, promotionStatus, priorityEnabled } = post
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(isEnabled)
  }, [isEnabled])

  // UPDATE ON SERVER
  const [isLoading, setIsLoading] = React.useState(false)

  const checkAndDeprioritize = React.useCallback(async ({
    promotable_status,
    promotion_enabled,
    is_running_in_conversions,
  }) => {
    // Deprioritize post if opted out for Grow & Nurture and Conversions and post is prioritized
    if (priorityEnabled && !(promotable_status === 'active' && promotion_enabled) && !is_running_in_conversions) {
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
    const { res: updatedPost, error } = await runChangeState({ artistId, postId, promotionEnabled: newState, campaignType })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setCurrentState(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, conversions_enabled, promotable_status } = updatedPost
    toggleCampaign(postId, isConversionsCampaign ? conversions_enabled : promotion_enabled, promotable_status, campaignType)

    checkAndDeprioritize(updatedPost)
  }, [artistId, postId, toggleCampaign, campaignType, isConversionsCampaign, checkAndDeprioritize])

  // HANDLE HOVER FOR TEASER
  const isTeaserActive = isConversionsCampaign && !isFeatureEnabled

  // HANDLE CLICK TO SHOW TEASER
  const WrapperTag = isTeaserActive ? 'button' : 'div'
  const openConversionsInterestPanel = useShowConversionsInterest()

  return (
    <WrapperTag
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue bg-grey-1',
        isTeaserActive ? 'cursor-pointer' : null,
        className,
      ].join(' ')}
      aria-label={isTeaserActive ? 'What is this?' : null}
      onClick={isTeaserActive ? openConversionsInterestPanel : null}
    >
      <div className="mb-0 flex items-center">
        {/* DOT */}
        <div
          className={[
            'w-4 h-4 rounded-full',
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={{
            background: !isConversionsCampaign ? growthGradient : conversionsGradient,
          }}
        />
        {/* TITLE */}
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {!isConversionsCampaign ? 'Grow & Nurture' : 'Convert'}
        </strong>
        {/* RUNNING LABEL */}
        {isActive && (
          <PostCardLabel
            copy="running"
            campaignType={campaignType}
          />
        )}
      </div>
      {/* TOGGLE SWITCH or LIGHTBULB ICON */}
      <div>
        {isTeaserActive ? (
          <PostCardToggleTeaser />
        ) : (
          <ToggleSwitch
            state={currentState}
            onChange={onChange}
            isLoading={isLoading}
            disabled={disabled}
          />
        )}
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
          campaignType={campaignType}
        />
      )}
    </WrapperTag>
  )
}

PostCardToggle.propTypes = {
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  campaignType: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  isFeatureEnabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
  isFeatureEnabled: false,
  isEnabled: false,
  isActive: false,
}

export default PostCardToggle
