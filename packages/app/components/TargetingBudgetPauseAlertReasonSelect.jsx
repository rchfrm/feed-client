import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import { budgetPauseReasonOptions } from '@/app/helpers/targetingHelpers'
import { getPlatformNameByValue } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/targetingPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const TargetingBudgetPauseAlertReasonSelect = ({
  reason,
  setReason,
  setHasOtherReason,
}) => {
  const [reasonOptions, setReasonOptions] = React.useState([])

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === reason) {
      return
    }

    setHasOtherReason(false)

    if (value === 'other') {
      setHasOtherReason(true)
    }

    setReason(value)
  }

  React.useEffect(() => {
    const options = []

    budgetPauseReasonOptions.forEach((option) => {
      // Add all general reasons and one objective specific reason
      if (!option?.objective || option?.objective === objective) {
        if (option.objective === 'growth') {
          options.push({
            // Update the name value with the current platform name if the objective is growth
            name: `${getPlatformNameByValue(platform)} ${option.name.toLowerCase()}`,
            value: option.value,
          })

          return
        }

        options.push(option)
      }
    })

    setReasonOptions(options)
  }, [objective, platform])

  React.useEffect(() => {
    if (reason || !reasonOptions.length) {
      return
    }

    setReason(reasonOptions[0].value)
  }, [reason, reasonOptions, setReason])

  return (
    <>
      <MarkdownText markdown={copy.pauseSpendingReason} />
      <Select
        handleChange={handleChange}
        name="reason"
        selectedValue={reason}
        options={reasonOptions}
      />
    </>
  )
}

TargetingBudgetPauseAlertReasonSelect.propTypes = {
}

TargetingBudgetPauseAlertReasonSelect.defaultProps = {
}

export default TargetingBudgetPauseAlertReasonSelect
