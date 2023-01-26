import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import RefreshIcon from '@/icons/RefreshIcon'

const TargetingDailyBudgetButtons = ({
  targetingState,
  initialTargetingState,
  saveTargetingSettings,
  updateTargetingBudget,
  disableSaving,
  budgetSlider,
  showCustomBudget,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })
  // SHOW SAVE BUTTON
  const showBudgetSave = React.useMemo(() => {
    return targetingState.budget !== initialTargetingState.budget
  }, [targetingState.budget, initialTargetingState.budget])
  // Reset budget
  const resetBudget = () => {
    updateTargetingBudget(initialTargetingState.budget)
    budgetSlider.noUiSlider.reset(initialTargetingState.budget)
  }
  const isDisabled = !! disableSaving || ! showBudgetSave

  return (
    <div className="flex">
      {! showCustomBudget && (
        <Button
          size="small"
          version="tertiary"
          className={[
            'mr-2',
          ].join(' ')}
          onClick={resetBudget}
          isDisabled={isDisabled}
          trackComponentName="TargetingDailyBudgetButtons"
        >
          <RefreshIcon
            className={['w-4 h-auto'].join(' ')}
            style={{ marginRight: 0 }}
          />
        </Button>
      )}
      <Button
        size="small"
        version="secondary"
        className={[
          'mr-2 xxs:mr-0',
        ].join(' ')}
        isDisabled={isDisabled}
        onClick={() => saveTargeting('budget')}
        trackComponentName="TargetingDailyBudgetButtons"
      >
        Save
      </Button>
    </div>
  )
}

TargetingDailyBudgetButtons.propTypes = {
  targetingState: PropTypes.object.isRequired,
  initialTargetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.string,
  showCustomBudget: PropTypes.bool.isRequired,
}

TargetingDailyBudgetButtons.defaultProps = {
  disableSaving: '',
}

export default TargetingDailyBudgetButtons
