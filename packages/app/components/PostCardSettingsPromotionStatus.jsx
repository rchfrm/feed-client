import React from 'react'
import PropTypes from 'prop-types'

import PostCardPromotionStatus from '@/app/PostCardPromotionStatus'

const PostCardSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
  isDisabled,
  className,
}) => {
  return (
    <div className="flex flex-column w-1/2">
      <h3 className={[
        isDisabled ? 'text-grey-2' : null,
        'font-bold text-lg',
      ].join(' ')}
      >
        Status
      </h3>
      <PostCardPromotionStatus
        promotionEnabled={promotionEnabled}
        promotionStatus={promotionStatus}
        className={className}
      />
    </div>
  )
}

PostCardSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardSettingsPromotionStatus.defaultProps = {
  isDisabled: false,
  className: null,
}

export default PostCardSettingsPromotionStatus
