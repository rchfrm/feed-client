import React from 'react'

import Router from 'next/router'

import useControlsStore from '@/app/stores/controlsStore'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as ROUTES from '@/app/constants/routes'

const getConversionsPreferences = state => state.conversionsPreferences

const ConversionsContent = () => {
  const [isWizardActive, setIsWizardActive] = React.useState(false)
  const conversionsPreferences = useControlsStore(getConversionsPreferences)
  const { featureFlags: { conversionsEnabled: conversionsFeatureEnabled } } = React.useContext(ArtistContext)

  // Redirect to the controls page if conversion feature isn't enabled
  React.useEffect(() => {
    if (!conversionsFeatureEnabled) {
      Router.push(ROUTES.CONTROLS)
    }
  }, [conversionsFeatureEnabled])

  // Check if conversions link, pixel event and call to action are all set
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)
  return (
    <>
      {hasSetUpConversions && !isWizardActive
        ? <ConversionsSettings />
        : <ConversionsWizard setIsWizardActive={setIsWizardActive} />}
    </>
  )
}

ConversionsContent.propTypes = {

}

export default ConversionsContent
