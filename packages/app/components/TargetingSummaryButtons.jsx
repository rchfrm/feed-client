import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import TargetingPauseButton from '@/app/TargetingPauseButton'

import useAnimateOnMount from '@/hooks/useAnimateOnMount'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

const TargetingSummaryButtons = ({
  targetingState,
  initialTargetingState,
  saveTargetingSettings,
  togglePauseCampaign,
  disableSaving,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ targetingState, saveTargetingSettings })
  // SHOW SAVE BUTTON
  const showBudgetSave = React.useMemo(() => {
    return targetingState.budget !== initialTargetingState.budget
  }, [targetingState.budget, initialTargetingState.budget])
  // const showBudgetSave = targetingState.budget !== initialTargetingState.budget

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
    <div className="iphone8:flex justify-between">
      {animatedDiv.isRendered && (
        <Button
          version="green small"
          className={[
            'w-full mb-5',
            'iphone8:w-auto iphone8:mb-0',
          ].join(' ')}
          onClick={() => saveTargeting('budget')}
          disabled={!!disableSaving}
          ref={animatedDiv.ref}
        >
          {disableSaving ? getSaveDisabledReason(disableSaving) : 'Update Budget'}
        </Button>
      )}
      {initialTargetingState.status && (
        <TargetingPauseButton
          className="ml-auto"
          buttonClass="w-full iphone8:flex:w-auto iphone8:mb-0"
          togglePauseCampaign={togglePauseCampaign}
          isPaused={!initialTargetingState.status}
        />
      )}
    </div>
  )
}

TargetingSummaryButtons.propTypes = {
  targetingState: PropTypes.object.isRequired,
  initialTargetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  togglePauseCampaign: PropTypes.func.isRequired,
  disableSaving: PropTypes.string,
}

TargetingSummaryButtons.defaultProps = {
  disableSaving: '',
}


export default TargetingSummaryButtons
