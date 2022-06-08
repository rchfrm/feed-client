import React from 'react'
import PropTypes from 'prop-types'

import PostCardPromotionStatus from '@/app/PostCardPromotionStatus'

const PostCardSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
}) => {
  return (
    <div className="flex flex-column w-1/2">
      <h3 className="font-bold text-lg">Status</h3>
      <PostCardPromotionStatus
        promotionEnabled={promotionEnabled}
        promotionStatus={promotionStatus}
      />
    </div>
  )
}

PostCardSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
}

PostCardSettingsPromotionStatus.defaultProps = {
}

export default PostCardSettingsPromotionStatus
