import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ToggleSwitch from '@/elements/ToggleSwitch'
import PostSettingsDisableAlert from '@/app/PostSettingsDisableAlert'
import { getPosts, postsConfig, togglePromotionEnabled, setPostPriority } from '@/app/helpers/postsHelpers'
import * as ROUTES from '@/app/constants/routes'

const PostToggle = ({
  status,
  campaignType,
  post,
  setPost,
  setPosts,
  sortBy,
  isEnabled,
  setIsEnabled,
  isLastPromotableNotRunPost,
  isDisabled,
  className,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})
  const [isLoading, setIsLoading] = React.useState(false)

  const { id: postId, promotionStatus } = post
  const isConversionsCampaign = campaignType === 'conversions'
  const isPostActive = promotionStatus === 'active'
  const { artistId } = React.useContext(ArtistContext)

  const checkAndDeprioritize = React.useCallback(async (status, updatedPost) => {
    const { promotionEnabled, conversionsEnabled } = updatedPost

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

  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_BUDGET,
    })
  }

  const getMorePosts = React.useCallback(async () => {
    const { formattedPosts } = await getPosts({
      limit: 5,
      artistId,
      sortBy,
      filterBy: postsConfig[status].filterBy,
      cursor: post.id,
    })

    if (formattedPosts.length === 0) {
      setOnAlertConfirm(() => goToControlsPage)
      setShouldShowAlert(true)

      return []
    }

    return formattedPosts
  }, [artistId, post.id, sortBy, status])

  const save = React.useCallback(async (value, forceRun = false) => {
    if (isPostActive && ! forceRun) {
      setOnAlertConfirm(() => () => save(value, true))
      setShouldShowAlert(true)

      return
    }

    if (isLastPromotableNotRunPost && ! forceRun) {
      const newPosts = await getMorePosts()
      if (! newPosts.length) {
        return
      }

      setPosts({
        type: 'add-posts',
        payload: {
          status,
          posts: newPosts,
        },
      })
    }

    setIsEnabled(value)
    setIsLoading(true)

    const { res: updatedPost, error } = await togglePromotionEnabled({
      artistId,
      postId,
      [isConversionsCampaign ? 'conversionsEnabled' : 'promotionEnabled']: value,
      campaignType,
    })

    if (error) {
      setIsEnabled(! value)
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
  }, [artistId, postId, campaignType, checkAndDeprioritize, setPost, setIsEnabled, isConversionsCampaign, isPostActive, isLastPromotableNotRunPost, getMorePosts, setPosts, status])

  const onConfirm = () => {
    onAlertConfirm()
    setShouldShowAlert(false)
  }

  const onCancel = () => {
    setShouldShowAlert(false)
  }

  return (
    <div className={className}>
      <ToggleSwitch
        state={isEnabled}
        onChange={save}
        isLoading={isLoading}
        disabled={isDisabled}
      />
      <PostSettingsDisableAlert
        shouldShowAlert={shouldShowAlert}
        onConfirm={onConfirm}
        onCancel={onCancel}
        campaignType={campaignType}
        isPostActive={isPostActive}
      />
    </div>
  )
}

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  setPosts: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

PostToggle.defaultProps = {
  isDisabled: false,
  className: null,
}

export default PostToggle
