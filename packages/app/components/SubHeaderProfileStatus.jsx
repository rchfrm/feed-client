import React from 'react'
import Router from 'next/router'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Button from '@/elements/Button'
import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  isSpendingPaused: state.isSpendingPaused,
})

const SubHeaderProfileStatus = () => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)
  const { profileSetupStatus, isSpendingPaused } = useControlsStore(getControlsStoreState)

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  if (! profileSetupStatus) {
    return null
  }

  return (
    hasSetUpProfile ? (
      isSpendingPaused ? (
        <div className="flex items-center font-bold">
          <div className="flex justify-center items-center w-6 h-6 rounded-full bg-red mr-2">
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
      )
    ) : (
      <Button
        onClick={goToGetStartedPage}
        size="small"
        color="yellow"
        trackComponentName="SubHeaderProfileStatus"
      >
        Continue set up
        <ArrowIcon direction="right" className="w-4 h-4 ml-2" />
      </Button>
    )
  )
}

export default SubHeaderProfileStatus
