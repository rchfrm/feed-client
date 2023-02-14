import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import SubHeaderProfileStatusIntegrationError from '@/app/SubHeaderProfileStatusIntegrationError'
import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'

const SubHeaderProfileStatus = ({
  isSpendingPaused,
  hasIntegrationError,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('md')

  if (hasIntegrationError) {
    return <SubHeaderProfileStatusIntegrationError />
  }

  return (
    <>
      <div className="mr-4">
        <p className="mb-0 font-bold text-xs xxs:text-sm !leading-[1.1] line-clamp-2">{isDesktopLayout ? 'Campaign status' : artist.name}</p>
      </div>
      {isSpendingPaused ? (
        <div className="flex items-center font-bold">
          <div className="flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-full bg-yellow mr-1">
            <PauseIcon className="w-3 h-3" />
          </div>
          Paused
        </div>
      ) : (
        <div className="flex items-center font-bold">
          <div className="flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-full bg-green mr-1">
            <PlayIcon className="w-3 h-3" />
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
