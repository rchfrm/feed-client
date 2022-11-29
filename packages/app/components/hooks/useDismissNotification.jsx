import React from 'react'

import useNotificationStore from '@/app/stores/notificationsStore'

const getSetAsDismissed = (state) => state.setAsDismissed

const useDismissNotification = (openedNotification) => {
  const setAsDismissed = useNotificationStore(getSetAsDismissed)

  const dismissNotification = React.useCallback(() => {
    const { id, entityType, entityId, isActionable, isComplete } = openedNotification
    // Do nothing if actionable and not complete
    if (isActionable && !isComplete) return
    // Dismiss
    setAsDismissed(id, entityType, entityId, isActionable)
  }, [openedNotification, setAsDismissed])

  return dismissNotification
}

export default useDismissNotification
