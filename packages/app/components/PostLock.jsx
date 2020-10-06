import React from 'react'
import PropTypes from 'prop-types'

import LockIcon from '@/icons/LockIcon'

const getPromotionStatus = (isLocked) => {
  if (isLocked) return true
  if (buttonState === 'off') return false
  return null
}

const PostLock = ({
  post,
  promotionEnabled,
  promotableStatus,
  togglePromotion,
}) => {
  const isLocked = Math.abs(promotableStatus) === 2
  console.log('promotableStatus', promotableStatus)
  console.log('promotionEnabled', promotionEnabled)
  return (
    <button
      className={[
        'mr-4',
      ].join(' ')}
      aria-label="Lock post status"
      title="Lock post status"
      style={{
        transition: 'opacity 300ms ease',
        opacity: isLocked ? 1 : 0.5,
      }}
      onClick={() => {
      }}
    >

      <LockIcon
        unlocked={!isLocked}
        className="h-5 w-auto"
      />
    </button>
  )
}

PostLock.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostLock
