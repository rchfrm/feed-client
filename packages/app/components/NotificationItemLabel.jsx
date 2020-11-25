import React from 'react'
import PropTypes from 'prop-types'

const NotificationItemLabel = ({ type }) => {
  const label = type === 'unread' ? 'Unread notification' : 'Notification requires action'
  return (
    <div
      className={[
        'absolute w-2 h-2 rounded-full',
        type === 'unread' ? 'md:-ml-2' : 'md:-mr-4',
        type === 'unread' ? 'bg-green' : 'bg-red',
      ].join(' ')}
      style={{
        top: '1.2rem',
        ...(type === 'unread' && { left: '0.75rem' }),
        ...(type === 'action' && { right: '4.5rem' }),
      }}
      aria-label={label}
      title={label}
    />
  )
}

NotificationItemLabel.propTypes = {
  type: PropTypes.string.isRequired,
}

export default React.memo(NotificationItemLabel)
