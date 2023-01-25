import React from 'react'
import Router from 'next/router'
import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Button from '@/elements/Button'
import PlayIcon from '@/icons/PlayIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import PauseIcon from '@/icons/PauseIcon'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  isSpendingPaused: state.isSpendingPaused,
  isControlsLoading: state.isControlsLoading,
})

const SubHeaderProfileStatus = () => {
  const { artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { profileSetupStatus, isSpendingPaused, isControlsLoading } = useControlsStore(getControlsStoreState)
  const isDesktopLayout = useBreakpointTest('md')

  const color = hasSetUpProfile ? isSpendingPaused ? 'yellow' : 'green' : 'red'
  const colorClasses = {
    green: 'bg-green-bg-light border-green-bg-dark',
    yellow: 'bg-yellow-bg-light border-yellow-bg-dark',
    red: 'bg-red-bg-light border-red-bg-dark',
  }

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  if (! profileSetupStatus || isControlsLoading) {
    return null
  }

  return (
    <div className="relative h-10 order-1 md:order-2 md:ml-auto mb-5 md:mb-0">
      <div className={[
        'h-full',
        'flex items-center px-3 justify-between',
        'border border-solid rounded-dialogue',
        colorClasses[color],
      ].join(' ')}
      >
        {hasSetUpProfile ? (
          <>
            <p className="mb-0 font-bold mr-3 xxs:mr-6">{isDesktopLayout ? 'Campaign status' : artist.name}</p>
            {isSpendingPaused ? (
              <div className="flex items-center font-bold">
                <div className="flex justify-center items-center w-6 h-6 rounded-full bg-yellow mr-2">
                  <PauseIcon className="w-4 h-4" />
                </div>
                Paused
              </div>
            ) : (
              <div className="flex items-center font-bold">
                <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green mr-2">
                  <PlayIcon className="w-4 h-4" />
                </div>
                Active
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center mr-3 xxs:mr-6">
              <div className="flex justify-center items-center w-6 h-6 rounded-full bg-red-bg-dark mr-2">
                <ExclamationCircleIcon className="w-4 h-4" />
              </div>
              <p className="mb-0 font-bold text-sm xxs:text-base">Set up incomplete</p>
            </div>
            <Button
              onClick={goToGetStartedPage}
              size="small"
              color="red"
              className="-mr-2"
              trackComponentName="SubHeaderProfileStatus"
            >
              Continue
              <ArrowIcon direction="right" className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default SubHeaderProfileStatus
