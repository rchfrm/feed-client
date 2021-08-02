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
  isEnabled,
  setIsEnabled,
  isDisabled,
}) => {
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const [isLoading, setIsLoading] = React.useState(false)
  const isConversionsCampaign = campaignType === 'conversions'

  const onChange = React.useCallback(async (newState) => {
    // Start loading
    setIsLoading(true)
    // Update state passed to toggle component
    setIsEnabled(newState)
    if (!isConversionsCampaign) {
      setIsPromotionEnabled(newState)
    } else {
      setIsConversionsEnabled(newState)
    }
    const { res: updatedPost, error } = await updatePost({ artistId, postId, promotionEnabled: newState, campaignType })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setIsEnabled(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, conversions_enabled, promotable_status } = updatedPost
    toggleCampaign(postId, isConversionsCampaign ? conversions_enabled : promotion_enabled, promotable_status, campaignType)
  }, [artistId, postId, toggleCampaign, campaignType, setIsEnabled, isConversionsCampaign])

  React.useEffect(() => {
    setIsEnabled(!isConversionsCampaign ? isPromotionEnabled : isConversionsEnabled)
  }, [campaignType, isPromotionEnabled, isConversionsEnabled, setIsEnabled, isConversionsCampaign])

  return (
    <div
      className={[
        'flex items-center',
        'rounded-dialogue bg-grey-1',
        'mb-10 p-3',
      ].join(' ')}
    >
      <ToggleSwitch
        state={isEnabled}
        onChange={onChange}
        isLoading={isLoading}
        className="mr-4"
        disabled={isDisabled}
      />
      <p className="font-bold mb-0">{`Promotion ${isEnabled ? 'enabled' : 'disabled'}`}</p>
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
  isDisabled: PropTypes.bool.isRequired,
}

PostCardSettingsToggle.defaultProps = {

}

export default PostCardSettingsToggle
