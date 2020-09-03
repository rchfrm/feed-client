import React from 'react'
// import PropTypes from 'prop-types'

import TargetingSummary from '@/app/TargetingSummary'
import TargetingSettings from '@/app/TargetingSettings'
import TargetingProgressButton from '@/app/TargetingProgressButton'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])

  // GET CURRENT VIEW
  const { currentView } = React.useContext(TargetingContext)

  return (
    <div>
      {/* SUMMARY */}
      {currentView === 'summary' && (
        <TargetingSummary />
      )}
      {currentView === 'customise' && (
        <TargetingSettings />
      )}
      {/* MOBILE PROGRESS BUTTON */}
      <TargetingProgressButton />
    </div>
  )
}

// TargetingContent.propTypes = {

// }

export default TargetingContent
