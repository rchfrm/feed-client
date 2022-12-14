import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ToggleSwitch from '@/elements/ToggleSwitch'
import PostDisableHandler from '@/app/PostDisableHandler'
import PostToggleAlert from '@/app/PostToggleAlert'
import * as ROUTES from '@/app/constants/routes'
import { updatePost, setPostPriority, formatPostsResponse } from '@/app/helpers/postsHelpers'

const PostToggle = ({
  campaignType,
  post,
  setPost,
  isEnabled,
  disabled,
  showAlertModal,
  shouldShowDisableAlert,
  className,
}) => {
  const [currentState, setCurrentState] = React.useState(isEnabled)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isConversionsCampaign = campaignType === 'conversions'
  const { id: postId } = post
  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    setCurrentState(isEnabled)
  }, [isEnabled])

  const checkAndDeprioritize = React.useCallback(async ({
    promotionEnabled,
    conversionsEnabled,
  }) => {
    // Deprioritize post if opted out for Grow & Nurture and Conversions and post is prioritized
    if (post.priorityEnabled && ! promotionEnabled && ! conversionsEnabled) {
      const { res } = await setPostPriority({ artistId, assetId: postId, priorityEnabled: post.priorityEnabled })

      const [updatedPost] = formatPostsResponse([res])
      const { priorityEnabled } = updatedPost

      setPost({
        type: 'toggle-priority',
        payload: {
          priorityEnabled,
          newStatus: priorityEnabled ? 'pending' : 'inactive',
          post: updatedPost,
        },
      })
    }
  }, [artistId, postId, setPost, post.priorityEnabled])

  const onChange = React.useCallback(async (newState) => {
    if (showAlertModal) {
      setShouldShowAlert(true)
      return
    }

    setIsLoading(true)
    setCurrentState(newState)

    const { res, error } = await updatePost({ artistId, postId, promotionEnabled: newState, campaignType })

    if (error) {
      setCurrentState(! newState)
      setIsLoading(false)
      return
    }

    const [updatedPost] = formatPostsResponse([res])
    const { promotionEnabled, conversionsEnabled, promotableStatus } = updatedPost

    setPost({
      type: isConversionsCampaign ? 'toggle-conversion' : 'toggle-promotion',
      payload: {
        promotionEnabled: isConversionsCampaign ? conversionsEnabled : promotionEnabled,
        promotableStatus,
        newStatus: promotionEnabled ? 'pending' : 'inactive',
        post: updatedPost,
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
    <div className={className}>
      <ToggleSwitch
        state={currentState}
        onChange={onChange}
        isLoading={isLoading}
        disabled={disabled}
      />
      {shouldShowDisableAlert && (
        <PostDisableHandler
          post={post}
          updatePost={setPost}
          artistId={artistId}
          isEnabled={currentState}
          setIsEnabled={setCurrentState}
          campaignType={campaignType}
        />
      )}
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

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  setPost: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  showAlertModal: PropTypes.bool,
  shouldShowDisableAlert: PropTypes.bool,
  className: PropTypes.string,
}

PostToggle.defaultProps = {
  disabled: false,
  isEnabled: false,
  showAlertModal: false,
  shouldShowDisableAlert: false,
  className: null,
}

export default PostToggle
