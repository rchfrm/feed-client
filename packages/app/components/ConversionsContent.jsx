import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

const ConversionsContent = () => {
  const { artist: { preferences } } = React.useContext(ArtistContext)
  const hasSetUpConversions = Object.values(preferences.conversions).every(Boolean)
  return (
    <>
      {hasSetUpConversions
        ? <ConversionsSettings />
        : <ConversionsWizard />}
    </>
  )
}

ConversionsContent.propTypes = {

}

export default ConversionsContent
