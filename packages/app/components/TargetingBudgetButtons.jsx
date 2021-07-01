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
  }
  // ANIMATE
  // Define animation config
  const animateToFrom = {
    opacity: { from: 0, to: 1 },
  }
  // Setup animation hook
  const animatedDiv = useAnimateOnMount({
    animateToFrom,
    animationOptions: {
      duration: [0.4, 0.2],
      ease: ['back.out(2)', 'power1.out'],
    },
    initial: 'hidden',
  })
  // Trigger animation
  React.useEffect(() => {
    // SHOW BUTTON
    if (showBudgetSave) {
      animatedDiv.showPresence()
      return
    }
    // HIDE BUTTON
    animatedDiv.hidePresence()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBudgetSave])

  return (
    <div className="flex justify-between items-end w-full">
      {animatedDiv.isRendered && (
        <>
          <Button
            version="black small"
            className={[
              'w-8 h-8 p-0',
              'flex-shrink-0',
              'rounded-full',
            ].join(' ')}
            onClick={resetBudget}
            disabled={!!disableSaving}
            ref={animatedDiv.ref}
          >
            <RefreshIcon
              className={['w-4 h-auto'].join(' ')}
              fill={brandColors.white}
              style={{ marginRight: 0 }}
            />
          </Button>
          <Button
            version="black small"
            className={[
              'w-full mb-5',
              'iphone8:w-auto iphone8:mb-0',
            ].join(' ')}
            onClick={() => saveTargeting('budget')}
            disabled={!!disableSaving}
            ref={animatedDiv.ref}
          >
            Save
          </Button>
        </>
      )}
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

