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
        'no-underline',
        'px-3 py-1',
        'text-white',
        'rounded-full',
        isPaused ? 'bg-green button--green' : 'bg-red button--red',
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={togglePause}
    >
      <strong>
        {isPaused ? 'Resume' : 'Pause'}
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
