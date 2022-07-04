import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import PostCardLabel from '@/app/PostCardLabel'

import ToggleSwitch from '@/elements/ToggleSwitch'
import PostCardDisableHandler from '@/app/PostCardDisableHandler'
import PostCardToggleAlert from '@/app/PostCardToggleAlert'

import { SidePanelContext } from '@/contexts/SidePanelContext'

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
  showAlertModal,
  className,
  hasSalesObjective,
}) => {
  // Store INTERNAL STATE based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(isEnabled)
  const isConversionsCampaign = campaignType === 'conversions'
  const { sidePanelOpen } = React.useContext(SidePanelContext)
  const { id: postId, postPromotable, promotionStatus, priorityEnabled } = post
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
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
    if (showAlertModal) {
      setShouldShowAlert(true)
      return
    }
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
    toggleCampaign(isConversionsCampaign ? conversions_enabled : promotion_enabled, promotable_status, campaignType, postId)
    checkAndDeprioritize(updatedPost)
  }, [artistId, postId, toggleCampaign, campaignType, isConversionsCampaign, showAlertModal, checkAndDeprioritize])

  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS,
    })
  }

  return (
    <div
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue',
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
            background: !isConversionsCampaign ? growthGradient : conversionsGradient,
          }}
        />
        {/* TITLE */}
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {!isConversionsCampaign ? hasSalesObjective ? 'Grow & Nurture' : 'Promotable' : 'Sales'}
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
          campaignType={campaignType}
        />
      )}
      {/* TOGGLE ALERT */}
      {shouldShowAlert && (
        <PostCardToggleAlert
          show={shouldShowAlert}
          onAlertConfirm={goToControlsPage}
          onCancel={() => {
            setShouldShowAlert(false)
          }}
        />
      )}
    </div>
  )
}

PostCardToggle.propTypes = {
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  postIndex: PropTypes.number,
  campaignType: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  showAlertModal: PropTypes.bool,
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostCardToggle.defaultProps = {
  postIndex: null,
  disabled: false,
  className: null,
  isEnabled: false,
  isActive: false,
  showAlertModal: false,
}

export default PostCardToggle
