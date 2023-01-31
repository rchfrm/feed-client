import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'

const SubHeaderProfileStatus = ({ isSpendingPaused }) => {
  const { isNavExpanded } = React.useContext(InterfaceContext)
  const { artist } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <>
      <p className="mb-0 font-bold mr-4 text-sm">
        {isDesktopLayout ? (
          <div>Campaign <span className={['lg:inline', isNavExpanded ? 'hidden' : null].join(' ')}>status</span></div>
        ) : (
          artist.name
        )}
      </p>
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
