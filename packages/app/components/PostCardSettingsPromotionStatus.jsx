import React from 'react'
import PropTypes from 'prop-types'

import PostCardPromotionStatus from '@/app/PostCardPromotionStatus'

const PostCardSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
  postPromotable,
  className,
}) => {
  return (
    <div className="flex flex-column w-1/2">
      <h3 className={[
        'font-bold text-lg',
      ].join(' ')}
      >
        Status
      </h3>
      <PostCardPromotionStatus
        promotionEnabled={promotionEnabled}
        promotionStatus={promotionStatus}
        postPromotable={postPromotable}
        className={className}
      />
    </div>
  )
}

PostCardSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  postPromotable: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettingsPromotionStatus.defaultProps = {
  className: null,
}

export default PostCardSettingsPromotionStatus
