import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import useNotificationStore from '@/app/stores/notificationsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import SubHeaderProfileStatusComplete from '@/app/SubHeaderProfileStatusComplete'
import SubHeaderProfileStatusIncomplete from '@/app/SubHeaderProfileStatusIncomplete'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  isSpendingPaused: state.isSpendingPaused,
  isControlsLoading: state.isControlsLoading,
})

const getNotificationsStoreState = (state) => ({
  isNotificationsLoading: state.loading,
  integrationError: state.integrationError,
})

const SubHeaderProfileStatus = () => {
  const { artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { profileSetupStatus, isSpendingPaused, isControlsLoading } = useControlsStore(getControlsStoreState)
  const { integrationError, isNotificationsLoading } = useNotificationStore(getNotificationsStoreState)
  const hasIntegrationError = Boolean(integrationError)

  const color = ! hasSetUpProfile || hasIntegrationError ? 'red' : isSpendingPaused ? 'yellow' : 'green'
  const colorClasses = {
    green: 'bg-green-bg-light border-green-bg-dark',
    yellow: 'bg-yellow-bg-light border-yellow-border',
    red: 'bg-red-bg-light border-red-bg-dark',
  }

  if (! profileSetupStatus || isControlsLoading || isNotificationsLoading) {
    return null
  }

  return (
    <div className={[
      'flex items-center p-3 justify-between',
      'relative h-10 md:h-12 order-1 md:order-2 md:ml-auto md:mb-0',
      'border border-solid rounded-dialogue text-xs',
      colorClasses[color],
    ].join(' ')}
    >
      {hasSetUpProfile ? (
        <SubHeaderProfileStatusComplete
          isSpendingPaused={isSpendingPaused}
          hasIntegrationError={hasIntegrationError}
        />
      ) : (
        <SubHeaderProfileStatusIncomplete />
      )}
    </div>
  )
}

export default SubHeaderProfileStatus
