import React from 'react'
import PropTypes from 'prop-types'
import PostPromotionStatus from '@/app/PostPromotionStatus'

const PostSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
  postPromotable,
}) => {
  return (
    <div className="flex flex-column w-1/2 sm:w-1/3">
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
        className="ml-5 sm:ml-0 mb-8 sm:mb-10"
      />
    </div>
  )
}

PostSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  postPromotable: PropTypes.bool.isRequired,
}

export default PostSettingsPromotionStatus
