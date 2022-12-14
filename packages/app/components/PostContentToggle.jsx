import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostContentLabel from '@/app/PostContentLabel'
import PostDisableHandler from '@/app/PostDisableHandler'
import PostToggleAlert from '@/app/PostToggleAlert'
import ToggleSwitch from '@/elements/ToggleSwitch'
import * as ROUTES from '@/app/constants/routes'
import { updatePost, setPostPriority, growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled, campaignType }) => {
  return updatePost({ artistId, postId, promotionEnabled, campaignType })
}

const PostContentToggle = ({
  campaignType,
  post,
  setPost,
  isEnabled,
  isActive,
  disabled,
  showAlertModal,
  className,
  hasSalesObjective,
}) => {
  const [currentState, setCurrentState] = React.useState(isEnabled)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isConversionsCampaign = campaignType === 'conversions'
  const { id: postId, postPromotable, promotionStatus, priorityEnabled } = post

  const { sidePanelOpen } = React.useContext(SidePanelContext)
  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    setCurrentState(isEnabled)
  }, [isEnabled])

  const checkAndDeprioritize = React.useCallback(async ({
    promotion_enabled,
    conversions_enabled,
  }) => {
    // Deprioritize post if opted out for Grow & Nurture and Conversions and post is prioritized
    if (priorityEnabled && ! promotion_enabled && ! conversions_enabled) {
      const { res: updatedPost } = await setPostPriority({ artistId, assetId: postId, priorityEnabled })

      const { priority_enabled } = updatedPost
      const payload = { priorityEnabled: priority_enabled }
      setPost({
        type: 'toggle-priority',
        payload,
      })
    }
  }, [artistId, postId, priorityEnabled, setPost])

  const onChange = React.useCallback(async (newState) => {
    if (showAlertModal) {
      setShouldShowAlert(true)
      return
    }

    setIsLoading(true)
    setCurrentState(newState)

    const { res: updatedPost, error } = await runChangeState({ artistId, postId, promotionEnabled: newState, campaignType })

    if (error) {
      setCurrentState(! newState)
      setIsLoading(false)
      return
    }

    const { promotion_enabled, conversions_enabled, promotable_status } = updatedPost
    setPost({
      type: isConversionsCampaign ? 'toggle-conversion' : 'toggle-promotion',
      payload: {
        promotionEnabled: isConversionsCampaign ? conversions_enabled : promotion_enabled,
        promotableStatus: promotable_status,
      },
    })
    checkAndDeprioritize(updatedPost)
    setIsLoading(false)
  }, [artistId, postId, campaignType, isConversionsCampaign, showAlertModal, checkAndDeprioritize, setPost])

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
        <div
          className={[
            'w-4 h-4 rounded-full',
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={{
            background: ! isConversionsCampaign ? growthGradient : conversionsGradient,
          }}
        />
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {! isConversionsCampaign ? hasSalesObjective ? 'Grow & Nurture' : 'Promotable' : 'Sales'}
        </strong>
        {isActive && (
          <PostContentLabel
            copy="running"
            campaignType={campaignType}
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
      {! sidePanelOpen && postPromotable && promotionStatus === 'active' && (
        <PostDisableHandler
          post={post}
          updatePost={setPost}
          artistId={artistId}
          isEnabled={currentState}
          setIsEnabled={setCurrentState}
          campaignType={campaignType}
        />
      )}
      {/* TOGGLE ALERT */}
      {shouldShowAlert && (
        <PostToggleAlert
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

PostContentToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  setPost: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  showAlertModal: PropTypes.bool,
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostContentToggle.defaultProps = {
  disabled: false,
  className: null,
  isEnabled: false,
  isActive: false,
  showAlertModal: false,
}

export default PostContentToggle
