import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'

const SubHeaderProfileStatus = ({ isSpendingPaused }) => {
  const { artist } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <>
      <p className="mb-0 font-bold mr-4">
        {isDesktopLayout ? (
          <div>Campaign <span className="hidden lg:inline">status</span></div>
        ) : (
          artist.name
        )}
      </p>
      {isSpendingPaused ? (
        <div className="flex items-center font-bold">
          <div className="flex justify-center items-center flex-shrink-0 w-6 h-6 rounded-full bg-yellow mr-2">
            <PauseIcon className="w-4 h-4" />
          </div>
          Paused
        </div>
      ) : (
        <div className="flex items-center font-bold">
          <div className="flex justify-center items-center flex-shrink-0 w-6 h-6 rounded-full bg-green mr-2">
            <PlayIcon className="w-4 h-4" />
          </div>
          Active
        </div>
      )}
    </>
  )
}

SubHeaderProfileStatus.propTypes = {
  isSpendingPaused: PropTypes.bool.isRequired,
}

export default SubHeaderProfileStatus
