import React from 'react'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import { demoCboState } from '@/app/helpers/cboHelpers'


const CboContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])
  // CBO STATE
  const [cboState, setCboState] = React.useState(demoCboState)
  console.log('cboState', cboState)
  return (
    <div>
      CBO
    </div>
  )
}

// CboContent.propTypes = {
  
// }

export default CboContent
