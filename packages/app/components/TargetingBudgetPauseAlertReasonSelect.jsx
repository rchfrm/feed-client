import React from 'react'
import PropTypes from 'prop-types'

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
  setHasCustomReason,
}) => {
  const [reasonOptions, setReasonOptions] = React.useState([])

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const platformName = getPlatformNameByValue(platform)

  const handleChange = ({ target }) => {
    const { value } = target
    if (value === reason) {
      return
    }

    setHasCustomReason(false)

    if (value === 'other') {
      setHasCustomReason(true)
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
            // Add the current platform name to name and value if the objective is growth
            name: `${platformName} ${option.name.toLowerCase()}`,
            value: `${platformName}-${option.value}`,
          })

          return
        }

        options.push(option)
      }
    })

    setReasonOptions(options)
  }, [objective, platform, platformName])

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
        name="reason"
        handleChange={handleChange}
        selectedValue={reason}
        options={reasonOptions}
      />
    </>
  )
}

TargetingBudgetPauseAlertReasonSelect.propTypes = {
  reason: PropTypes.string.isRequired,
  setReason: PropTypes.func.isRequired,
  setHasCustomReason: PropTypes.bool.isRequired,
}

TargetingBudgetPauseAlertReasonSelect.defaultProps = {
}

export default TargetingBudgetPauseAlertReasonSelect
