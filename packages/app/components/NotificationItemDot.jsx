import React from 'react'
import PropTypes from 'prop-types'

const NotificationItemDot = ({ type }) => {
  const posX = '0.75rem'
  return (
    <div
      className={[
        'absolute w-2 h-2 rounded-full',
        type === 'unread' ? 'md:-ml-2' : 'md:-mr-2',
        type === 'unread' ? 'bg-green' : 'bg-red',
      ].join(' ')}
      style={{
        top: '1.2rem',
        ...(type === 'unread' && { left: posX }),
        ...(type === 'action' && { right: posX }),
      }}
    />
  )
}

NotificationItemDot.propTypes = {
  type: PropTypes.string.isRequired,
}

export default React.memo(NotificationItemDot)
