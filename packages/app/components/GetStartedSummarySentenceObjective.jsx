import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform } = wizardState || {}
  const isComplete = Boolean((objective || storedObjective) && (platform || storedPlatform))

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.objective}
      isComplete={isComplete}
      className="mr-2"
    >
      {copy.objectiveSummary((objective || storedObjective), (platform || storedPlatform))}
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentenceObjective.propTypes = {
}

GetStartedSummarySentenceObjective.defaultProps = {
}

export default GetStartedSummarySentenceObjective
