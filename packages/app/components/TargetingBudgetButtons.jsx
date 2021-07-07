import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useAnimateOnMount from '@/hooks/useAnimateOnMount'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import RefreshIcon from '@/icons/RefreshIcon'

import brandColors from '@/constants/brandColors'

const TargetingSummaryButtons = ({
  targetingState,
  initialTargetingState,
  saveTargetingSettings,
  updateTargetingBudget,
  disableSaving,
  isFirstTimeUser,
  budgetSlider,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  // SHOW SAVE BUTTON
  const showBudgetSave = React.useMemo(() => {
    return targetingState.budget !== initialTargetingState.budget
  }, [targetingState.budget, initialTargetingState.budget])
  // Reset budget
  const resetBudget = () => {
    updateTargetingBudget(initialTargetingState.budget)
    budgetSlider.noUiSlider.reset(initialTargetingState.budget)
  }
  const isDisabled = !!disableSaving || !showBudgetSave

  return (
    <div className="flex justify-between items-end w-full">
      <Button
        version="black small"
        className={[
          'w-8 h-8 p-0',
          'flex-shrink-0',
          'rounded-full',
          isDisabled ? 'bg-grey-2 pointer-events-none' : '',
        ].join(' ')}
        onClick={resetBudget}
        // disabled={isDisabled}
      >
        <RefreshIcon
          className={['w-4 h-auto'].join(' ')}
          fill={brandColors.white}
          style={{ marginRight: 0 }}
        />
      </Button>
      <Button
        version="green small"
        className={[
          'h-8',
          'rounded-full',
          isDisabled ? 'bg-grey-2 pointer-events-none' : '',
        ].join(' ')}
        onClick={() => saveTargeting('budget')}
        // disabled={isDisabled}
      >
        Save
      </Button>
    </div>
  )
}

TargetingSummaryButtons.propTypes = {
  targetingState: PropTypes.object.isRequired,
  initialTargetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.string,
}

TargetingSummaryButtons.defaultProps = {
  disableSaving: '',
}


export default TargetingSummaryButtons

