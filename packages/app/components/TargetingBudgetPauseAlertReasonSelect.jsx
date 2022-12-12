import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import { budgetPauseReasonOptions } from '@/app/helpers/targetingHelpers'
import { getPlatformNameByValue } from '@/app/helpers/artistHelpers'
import { shuffleArray } from '@/helpers/utils'

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

  const handleChange = ({ target }) => {
    const { value } = target
    if (value === reason) {
      return
    }

    setHasCustomReason(value === 'other')
    setReason(value)
  }

  React.useEffect(() => {
    const options = []

    const generalOptions = budgetPauseReasonOptions.slice(0, -1)
    const lastOption = budgetPauseReasonOptions.slice(-1)[0]
    const shuffledGeneralOptions = shuffleArray(generalOptions)
    const newOptions = [...shuffledGeneralOptions, lastOption]

    newOptions.forEach((option) => {
      // Add all general reasons and one objective specific reason
      if (! option?.objective || option?.objective === objective) {
        if (option.objective === 'growth') {
          const platformName = getPlatformNameByValue(platform)

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
  }, [objective, platform])

  return (
    <>
      <MarkdownText markdown={copy.pauseSpendingReason} />
      <Select
        name="reason"
        handleChange={handleChange}
        selectedValue={reason}
        options={reasonOptions}
        placeholder="Please select a reason"
      />
    </>
  )
}

TargetingBudgetPauseAlertReasonSelect.propTypes = {
  reason: PropTypes.string.isRequired,
  setReason: PropTypes.func.isRequired,
  setHasCustomReason: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlertReasonSelect.defaultProps = {
}

export default TargetingBudgetPauseAlertReasonSelect
