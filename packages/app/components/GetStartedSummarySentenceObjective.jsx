import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { objectives } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const { color } = objectives.find(({ value }) => value === objective) || {}

  return (
    <GetStartedSummarySentenceSection
      section="objective"
      isComplete={objective && platform}
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
