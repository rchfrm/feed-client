import React from 'react'
import PropTypes from 'prop-types'

import NotificationItemDot from '@/app/NotificationItemDot'

const NotificationItem = ({ notification, className }) => {
  const {
    read,
    action,
    title,
    description,
  } = notification
  return (
    <button
      className={[
        'block relative w-full text-left',
        'px-8 py-3 mb-2',
        'md:w-1/2',
        'border-solid border-grey-2 border-t',
        className,
      ].join(' ')}
    >
      {/* UNREAD DOT */}
      {!read && <NotificationItemDot type="unread" />}
      {/* ACTION DOT */}
      {!action && <NotificationItemDot type="action" />}
      {/* TITLE */}
      <h4 className="font-body text-base mb-2">
        <strong>{title}</strong>
      </h4>
      {/* DESCRIPTION */}
      <p className="text-sm block mb-2">{description}</p>
      {/* READ MORE */}
      <p className="text-sm text-grey-3 block mb-0">
        Read more
      </p>
    </button>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  className: PropTypes.string,
}

NotificationItem.defaultProps = {
  className: null,
}


export default NotificationItem
