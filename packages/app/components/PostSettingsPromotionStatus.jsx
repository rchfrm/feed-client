import React from 'react'
import PropTypes from 'prop-types'
import PostPromotionStatus from '@/app/PostPromotionStatus'

const PostSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
  isPromotable,
}) => {
  return (
    <div className="flex flex-column w-full sm:w-1/2">
      <h3 className={[
        'font-bold text-lg',
      ].join(' ')}
      >
        Status
      </h3>
      <PostPromotionStatus
        promotionEnabled={promotionEnabled}
        promotionStatus={promotionStatus}
        isPromotable={isPromotable}
        className="ml-5 sm:ml-0 mb-5 sm:mb-10"
      />
    </div>
  )
}

PostSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  isPromotable: PropTypes.bool.isRequired,
}

export default PostSettingsPromotionStatus
