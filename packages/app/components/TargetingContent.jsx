import React from 'react'
// import PropTypes from 'prop-types'

import TargetingSummary from '@/app/TargetingSummary'
import TargetingProgressButton from '@/app/TargetingProgressButton'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const TargetingContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])

  return (
    <div>
      {/* SUMMARY */}
      <TargetingSummary />
      {/* MOBILE PROGRESS BUTTON */}
      <TargetingProgressButton />
    </div>
  )
}

// TargetingContent.propTypes = {

// }

export default TargetingContent
