import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ToggleSwitch from '@/elements/ToggleSwitch'
import PostDisableHandler from '@/app/PostDisableHandler'
import PostConversionsAlert from '@/app/PostConversionsAlert'
import * as ROUTES from '@/app/constants/routes'
import { togglePromotionEnabled, setPostPriority } from '@/app/helpers/postsHelpers'

const PostToggle = ({
  campaignType,
  post,
  setPost,
  isEnabled,
  setIsEnabled,
  disabled,
  shouldShowConversionsAlert,
  className,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasChanged, setHasChanged] = React.useState(false)

  const { id: postId, postPromotable, promotionStatus } = post
  const shouldShowDisableAlert = postPromotable && promotionStatus === 'active' && hasChanged
  const isConversionsCampaign = campaignType === 'conversions'

  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    setHasChanged(false)
  }, [campaignType])

  const checkAndDeprioritize = React.useCallback(async (status, updatedPost) => {
    const { promotionEnabled, conversionsEnabled } = updatedPost
    // Deprioritize post if opted out for Grow & Nurture and Conversions and post is prioritized
    if (post.priorityEnabled && ! promotionEnabled && ! conversionsEnabled) {
      const { res: updatedPost } = await setPostPriority({ artistId, assetId: postId, priorityEnabled: false })
      const { priorityEnabled } = updatedPost

      setPost({
        type: 'toggle-priority',
        payload: {
          status,
          newStatus: priorityEnabled ? 'pending' : 'inactive',
          postId,
          post: updatedPost,
          priorityEnabled,
        },
      })
    }
  }, [artistId, postId, setPost, post.priorityEnabled])

  const onChange = React.useCallback(async (newState) => {
    if (shouldShowConversionsAlert) {
      setShouldShowAlert(true)
      return
    }

    setIsLoading(true)
    setHasChanged(true)
    setIsEnabled(newState)

    const { res: updatedPost, error } = await togglePromotionEnabled({
      artistId,
      postId,
      [isConversionsCampaign ? 'conversionsEnabled' : 'promotionEnabled']: newState,
      campaignType,
    })

    if (error) {
      setIsEnabled(! newState)
      setIsLoading(false)
      return
    }

    const { promotionEnabled, conversionsEnabled, promotableStatus } = updatedPost
    const newStatus = promotionEnabled || conversionsEnabled ? 'pending' : 'inactive'

    setPost({
      type: 'toggle-promotion',
      payload: {
        newStatus,
        postId,
        post: updatedPost,
        promotionEnabled,
        conversionsEnabled,
        promotableStatus,
      },
    })
    checkAndDeprioritize(newStatus, updatedPost)
    setIsLoading(false)
  }, [artistId, postId, campaignType, shouldShowConversionsAlert, checkAndDeprioritize, setPost, setIsEnabled, isConversionsCampaign])

  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS,
    })
  }

  return (
    <div className={className}>
      <ToggleSwitch
        state={isEnabled}
        onChange={onChange}
        isLoading={isLoading}
        disabled={disabled}
      />
      {shouldShowDisableAlert && (
        <PostDisableHandler
          post={post}
          updatePost={setPost}
          artistId={artistId}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          campaignType={campaignType}
        />
      )}
      {shouldShowAlert && (
        <PostConversionsAlert
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

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  setPost: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  shouldShowConversionsAlert: PropTypes.bool,
  className: PropTypes.string,
}

PostToggle.defaultProps = {
  disabled: false,
  isEnabled: false,
  shouldShowConversionsAlert: false,
  className: null,
}

export default PostToggle
