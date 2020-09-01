import React from 'react'
// import PropTypes from 'prop-types'

import CboSummary from '@/app/CboSummary'
import CboProgressButton from '@/app/CboProgressButton'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const CboContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])

  return (
    <div>
      {/* SUMMARY */}
      <CboSummary />
      {/* MOBILE PROGRESS BUTTON */}
      <CboProgressButton />
    </div>
  )
}

// CboContent.propTypes = {

// }

export default CboContent
