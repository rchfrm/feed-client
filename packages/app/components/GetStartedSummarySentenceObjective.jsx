import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { objectives } from '@/app/helpers/artistHelpers'
import { capitalise } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
})

const GetStartedSummarySentenceObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const { color } = objectives.find(({ value }) => value === objective)
  const borderClasses = `border-2 border-solid border-${color}`

  return (
    <span className={[
      'rounded-full',
      'py-1 px-3 mr-1 mb-2',
      'whitespace-pre',
      borderClasses,
    ].join(' ')}
    >{capitalise(platform)} {objective}
    </span>
  )
}

GetStartedSummarySentenceObjective.propTypes = {
}

GetStartedSummarySentenceObjective.defaultProps = {
}

export default GetStartedSummarySentenceObjective
