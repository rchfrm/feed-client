import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import SubHeaderProfileStatusComplete from '@/app/SubHeaderProfileStatusComplete'
import SubHeaderProfileStatusIncomplete from '@/app/SubHeaderProfileStatusIncomplete'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  isSpendingPaused: state.isSpendingPaused,
  isControlsLoading: state.isControlsLoading,
})

const SubHeaderProfileStatus = () => {
  const { artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { profileSetupStatus, isSpendingPaused, isControlsLoading } = useControlsStore(getControlsStoreState)

  const color = hasSetUpProfile ? isSpendingPaused ? 'yellow' : 'green' : 'red'
  const colorClasses = {
    green: 'bg-green-bg-light border-green-bg-dark',
    yellow: 'bg-yellow-bg-light border-yellow-bg-dark',
    red: 'bg-red-bg-light border-red-bg-dark',
  }

  if (! profileSetupStatus || isControlsLoading) {
    return null
  }

  return (
    <div className={[
      'flex items-center p-3 justify-between',
      'relative h-8 md:h-10 order-1 md:order-2 md:ml-auto md:mb-0',
      'border border-solid rounded-dialogue text-xs',
      colorClasses[color],
    ].join(' ')}
    >
      {hasSetUpProfile ? (
        <SubHeaderProfileStatusComplete isSpendingPaused={isSpendingPaused} />
      ) : (
        <SubHeaderProfileStatusIncomplete />
      )}
    </div>
  )
}

export default SubHeaderProfileStatus
