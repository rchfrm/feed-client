import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import PostCardToggle from '@/app/PostCardToggle'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
  conversionsEnabled: state.conversionsEnabled,
})

const PostCardToggles = ({
  artistId,
  post,
  postToggleSetterType,
  toggleCampaign,
  priorityEnabled,
  togglesClassName,
  className,
}) => {
  // Get conversions feature flag value
  const { featureFlags: { conversionsEnabled: conversionsFeatureEnabled } } = React.useContext(ArtistContext)
  // Get conversions store values
  const { canRunConversions, conversionsEnabled: globalConversionsEnabled } = useControlsStore(getControlsStoreState)
  const {
    promotionStatus,
    promotionEnabled,
    conversionsEnabled,
    isRunningInConversions,
  } = post

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* GROWTH TOGGLE */}
      <PostCardToggle
        post={post}
        postToggleSetterType={postToggleSetterType}
        campaignType="all"
        artistId={artistId}
        isEnabled={promotionEnabled}
        toggleCampaign={toggleCampaign}
        disabled={promotionStatus === 'archived' && !priorityEnabled}
        isActive={promotionStatus === 'active' && promotionEnabled}
        className={togglesClassName}
      />
      {/* CONVERT TOGGLE */}
      <PostCardToggle
        post={post}
        postToggleSetterType={postToggleSetterType}
        campaignType="conversions"
        artistId={artistId}
        isEnabled={conversionsEnabled}
        toggleCampaign={toggleCampaign}
        disabled={!globalConversionsEnabled || !canRunConversions || (promotionStatus === 'archived' && !priorityEnabled)}
        isActive={isRunningInConversions}
        className={togglesClassName}
        isFeatureEnabled={conversionsFeatureEnabled}
      />
    </div>
  )
}

PostCardToggles.propTypes = {
  artistId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
