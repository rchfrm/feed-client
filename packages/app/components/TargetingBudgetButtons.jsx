import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import RefreshIcon from '@/icons/RefreshIcon'

import brandColors from '@/constants/brandColors'

const TargetingBudgetButtons = ({
  targetingState,
  initialTargetingState,
  saveTargetingSettings,
  updateTargetingBudget,
  disableSaving,
  isFirstTimeUser,
  budgetSlider,
  showCustomBudget,
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
      {!showCustomBudget && (
        <Button
          version="small"
          className={[
            'w-8 h-8 p-0',
            'flex-shrink-0',
            'bg-black',
            'rounded-full',
            isDisabled ? 'bg-grey-2 focus:bg-grey-2 pointer-events-none' : '',
          ].join(' ')}
          onClick={resetBudget}
        >
          <RefreshIcon
            className={['w-4 h-auto'].join(' ')}
            fill={brandColors.white}
            style={{ marginRight: 0 }}
          />
        </Button>
      )}
      <Button
        version="green small"
        className={[
          'h-8 ml-auto',
          'rounded-full',
          isDisabled ? 'bg-grey-2 pointer-events-none' : '',
        ].join(' ')}
        onClick={() => saveTargeting('budget')}
      >
        Save
      </Button>
    </div>
  )
}

TargetingBudgetButtons.propTypes = {
  targetingState: PropTypes.object.isRequired,
  initialTargetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.string,
  showCustomBudget: PropTypes.bool.isRequired,
}

TargetingBudgetButtons.defaultProps = {
  disableSaving: '',
}

export default TargetingBudgetButtons
