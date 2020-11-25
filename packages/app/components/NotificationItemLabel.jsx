import React from 'react'
import PropTypes from 'prop-types'

import FlagIcon from '@/icons/FlagIcon'

import brandColors from '@/constants/brandColors'

const NotificationItemLabel = ({ type }) => {
  const label = type === 'unread' ? 'Unread notification' : 'Notification requires action'
  return (
    <div
      className={[
        'absolute w-2 h-2',
        type === 'unread' ? 'md:-ml-2' : 'md:-mr-4',
        type === 'unread' ? 'md:-ml-2' : 'md:-mr-4',
        type === 'unread' ? 'bg-green rounded-full' : null,
      ].join(' ')}
      style={{
        top: type === 'unread' ? '1.2rem' : '1.05rem',
        ...(type === 'unread' && { left: '0.75rem' }),
        ...(type === 'action' && { right: '4.5rem' }),
      }}
      aria-label={label}
      title={label}
    >
      {type === 'action' && (
        <FlagIcon className="w-full h-auto" fill={brandColors.red} />
      )}
    </div>
  )
}

NotificationItemLabel.propTypes = {
  type: PropTypes.string.isRequired,
}

export default React.memo(NotificationItemLabel)
