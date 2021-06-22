import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

const getConversionsPreferences = state => state.conversionsPreferences

const ConversionsContent = () => {
  const conversionsPreferences = useControlsStore(getConversionsPreferences)
  // Check if conversions link, pixel event and call to action are all set
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)
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
