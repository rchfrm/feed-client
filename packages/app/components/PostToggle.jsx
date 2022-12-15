import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ToggleSwitch from '@/elements/ToggleSwitch'
import { togglePromotionEnabled, setPostPriority } from '@/app/helpers/postsHelpers'

const PostToggle = ({
  campaignType,
  post,
  setPost,
  isEnabled,
  setIsEnabled,
  disabled,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { id: postId } = post
  const isConversionsCampaign = campaignType === 'conversions'
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

  const onChange = React.useCallback(async (newState) => {
    setIsLoading(true)
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
  }, [artistId, postId, campaignType, checkAndDeprioritize, setPost, setIsEnabled, isConversionsCampaign])

  return (
    <div className={className}>
      <ToggleSwitch
        state={isEnabled}
        onChange={onChange}
        isLoading={isLoading}
        disabled={disabled}
      />
    </div>
  )
}

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  setPost: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostToggle.defaultProps = {
  disabled: false,
  isEnabled: false,
  className: null,
}

export default PostToggle
