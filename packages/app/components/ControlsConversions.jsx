import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

const getConversionsPreferences = state => state.conversionsPreferences

const ControlsConversions = () => {
  const [isWizardActive, setIsWizardActive] = React.useState(false)
  const conversionsPreferences = useControlsStore(getConversionsPreferences)
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

ControlsConversions.propTypes = {

}

export default ControlsConversions

