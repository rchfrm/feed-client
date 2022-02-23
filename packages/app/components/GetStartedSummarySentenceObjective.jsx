import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { objectives } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const { color } = objectives.find(({ value }) => value === objective) || {}
  const borderClasses = `border-2 border-solid border-${color}`

  return (
    <span className={[
      'rounded-full',
      'py-1 px-3 mr-1 mb-2',
      'whitespace-pre',
      borderClasses,
    ].join(' ')}
    >{copy.objectiveSummary(objective, platform)}
    </span>
  )
}

GetStartedSummarySentenceObjective.propTypes = {
}

GetStartedSummarySentenceObjective.defaultProps = {
}

export default GetStartedSummarySentenceObjective
