import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections, objectives } from '@/app/helpers/artistHelpers'
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

  const { color } = objectives.find(({ value }) => value === objective || storedObjective) || {}

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.objective}
      isComplete={isComplete}
      color={color}
    >
      {copy.objectiveSummary(objective, platform)}
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentenceObjective.propTypes = {
}

GetStartedSummarySentenceObjective.defaultProps = {
}

export default GetStartedSummarySentenceObjective
