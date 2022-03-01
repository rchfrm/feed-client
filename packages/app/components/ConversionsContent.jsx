import React from 'react'

import Router from 'next/router'

import ConversionsSettings from '@/app/ConversionsSettings'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as ROUTES from '@/app/constants/routes'

const ConversionsContent = () => {
  const { featureFlags: { conversionsEnabled: conversionsFeatureEnabled } } = React.useContext(ArtistContext)

  // Redirect to the controls page if conversion feature isn't enabled
  React.useEffect(() => {
    if (!conversionsFeatureEnabled) {
      Router.push(ROUTES.CONTROLS)
    }
  }, [conversionsFeatureEnabled])

  return (
    <ConversionsSettings />
  )
}

ConversionsContent.propTypes = {

}

export default ConversionsContent
