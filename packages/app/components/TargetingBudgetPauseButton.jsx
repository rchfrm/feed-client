import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingBudgetSpendingButton = ({
  togglePauseCampaign,
  isPaused,
}) => {
  const { targetingState } = React.useContext(TargetingContext)
  // GOT TOGGLE FUNCTION
  const togglePause = useSaveTargeting({ spendingPaused: isPaused, togglePauseCampaign, targetingState })

  return (
    <a
      className={[
        'flex items-center',
        'absolute top-0 left-0',
        'ml-6 mt-5',
        'no-underline',
        'px-3 py-1',
        'bg-red text-white button--red',
        'rounded-full',
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={togglePause}
    >
      <strong>
        {isPaused ? 'Resume Spending' : 'Pause Spending'}
      </strong>
    </a>
  )
}

TargetingBudgetSpendingButton.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
}

TargetingBudgetSpendingButton.defaultProps = {
}

export default TargetingBudgetSpendingButton
