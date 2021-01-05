import React from 'react'
import PropTypes from 'prop-types'

import NotificationItemLabel from '@/app/NotificationItemLabel'

import useNotificationStore from '@/app/store/notificationsStore'

const getOpenNotificationAction = state => state.setAsOpen
const getOpenNotificationId = state => state.openNotificationId

const NotificationItem = ({ notification, className }) => {
  const {
    id,
    date,
    isRead,
    action,
    title,
    summary,
  } = notification

  const setAsOpen = useNotificationStore(getOpenNotificationAction)
  const openNotificationId = useNotificationStore(getOpenNotificationId)
  const isActive = id === openNotificationId

  return (
    <button
      className={[
        'block relative w-full text-left',
        'px-8 py-3 mb-2',
        'md:px-6',
        'md:w-1/2',
        className,
      ].join(' ')}
      onClick={() => {
        setAsOpen(id)
      }}
    >
      {/* OVERLINE */}
      <div
        className={[
          'absolute w-full top-0 left-0',
          isActive ? 'bg-green' : 'bg-grey-2',
        ].join(' ')}
        style={{
          height: isActive ? 2 : 1,
        }}
      />
      {/* UNREAD DOT */}
      {!isRead && <NotificationItemLabel type="unread" />}
      {/* ACTION DOT */}
      {!action && <NotificationItemLabel type="action" />}
      {/* DATE */}
      <p
        className={[
          'absolute top-0 right-0 mt-3 mr-3',
          'md:mr-0',
          'text-sm text-grey-3',
        ].join(' ')}
        style={{ paddingTop: '0.05rem' }}
      >
        {date}
      </p>
      {/* TITLE */}
      <h4 className="font-body text-base mb-2 mr-16 truncate">
        <strong>{title}</strong>
      </h4>
      {/* DESCRIPTION */}
      <p className="text-sm block mb-2 truncate">{summary}</p>
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
