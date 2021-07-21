import React from 'react'
import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'

import { updatePost } from '@/app/helpers/postsHelpers'

const PostCardSettingsToggle = ({
  promotionEnabled,
  conversionsEnabled,
  campaignType,
  toggleCampaign,
  postId,
  artistId,
}) => {
  const [currentState, setCurrentState] = React.useState(promotionEnabled)
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const [isLoading, setIsLoading] = React.useState(false)

  const onChange = React.useCallback(async (newState) => {
    // Start loading
    setIsLoading(true)
    // Update state passed to toggle component
    setCurrentState(newState)
    if (campaignType === 'all') {
      setIsPromotionEnabled(newState)
    } else {
      setIsConversionsEnabled(newState)
    }
    const { res: updatedPost, error } = await updatePost({ artistId, postId, promotionEnabled: newState, campaignType })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setCurrentState(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, promotable_status } = updatedPost
    // Update post list state
    toggleCampaign(postId, promotion_enabled, promotable_status, campaignType)
  }, [artistId, postId, toggleCampaign, campaignType])

  React.useEffect(() => {
    setCurrentState(campaignType === 'all' ? isPromotionEnabled : isConversionsEnabled)
  }, [campaignType, isPromotionEnabled, isConversionsEnabled])

  return (
    <div
      className={[
        'flex items-center',
        'rounded-dialogue bg-grey-1',
        'mb-10 p-3',
      ].join(' ')}
    >
      <ToggleSwitch
        state={currentState}
        onChange={onChange}
        isLoading={isLoading}
        className="mr-4"
      />
      <p className="font-bold mb-0">{`Promotion ${currentState ? 'enabled' : 'disabled'}`}</p>
    </div>
  )
}

PostCardSettingsToggle.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  conversionsEnabled: PropTypes.bool.isRequired,
  campaignType: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
}

PostCardSettingsToggle.defaultProps = {

}

export default PostCardSettingsToggle
