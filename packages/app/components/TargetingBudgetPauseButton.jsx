import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import brandColors from '@/constants/brandColors'

import * as utils from '@/helpers/utils'

const TargetingBudgetSpendingButton = ({
  togglePauseCampaign,
  isPaused,
}) => {
  const { targetingState } = React.useContext(TargetingContext)
  // GOT TOGGLE FUNCTION
  const togglePause = useSaveTargeting({ spendingPaused: isPaused, togglePauseCampaign, targetingState })
  const action = isPaused ? 'resume' : 'pause'
  const icons = {
    pause: <PauseIcon color={brandColors.white} className="w-3 h-auto mr-2" />,
    resume: <PlayIcon color={brandColors.white} className="w-3 h-auto mr-2" />,
  }
  const Icon = icons[action]
  return (
    <a
      className={[
        'flex flex-row items-center',
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
      {Icon}
      {utils.capitalise(action)}
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
