import React from 'react'
import PropTypes from 'prop-types'
import PostPromotionStatus from '@/app/PostPromotionStatus'

const PostSettingsPromotionStatus = ({
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
      <PostPromotionStatus
        promotionEnabled={promotionEnabled}
        promotionStatus={promotionStatus}
        postPromotable={postPromotable}
        className={className}
      />
    </div>
  )
}

PostSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  postPromotable: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostSettingsPromotionStatus.defaultProps = {
  className: null,
}

export default PostSettingsPromotionStatus
