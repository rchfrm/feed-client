import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'

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
  const isDesktopLayout = useBreakpointTest('xs')

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform } = wizardState || {}
  const isComplete = Boolean((objective || storedObjective) && (platform || storedPlatform))

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.objective}
      isComplete={isComplete}
      className="mr-1 sm:mr-2"
    >
      {copy.objectiveSummary((objective || storedObjective), (platform || storedPlatform), isDesktopLayout)}
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentenceObjective.propTypes = {
}

GetStartedSummarySentenceObjective.defaultProps = {
}

export default GetStartedSummarySentenceObjective
