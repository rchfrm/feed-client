import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import brandColors from '@/constants/brandColors'

import { getDataSourceValue } from '@/app/helpers/appServer'
import { getSpendingData } from '@/app/helpers/targetingHelpers'
import * as utils from '@/helpers/utils'

const TargetingDailyBudgetPauseButton = ({
  togglePauseCampaign,
  isPaused,
  isDisabled,
}) => {
  const [spendingData, setSpendingData] = React.useState(null)

  const { targetingState } = React.useContext(TargetingContext)
  const { artistId } = React.useContext(ArtistContext)

  // GOT TOGGLE FUNCTION
  const togglePause = useSaveTargeting({
    spendingPaused: isPaused,
    togglePauseCampaign,
    spendingData,
    targetingState,
  })
  const action = isPaused ? 'resume' : 'pause'
  const backgroundClasses = isPaused ? 'bg-green button--green' : 'bg-red button--red'
  const icons = {
    pause: <PauseIcon color={brandColors.offwhite} className="w-3 h-auto mr-2" />,
    resume: <PlayIcon color={brandColors.offwhite} className="w-3 h-auto mr-2" />,
  }
  const Icon = icons[action]

  const onClick = async () => {
    // Get ad spend data if pausing daily budget
    if (! isPaused) {
      const dataSource = 'facebook_ad_spend_feed'
      const response = await getDataSourceValue([dataSource], artistId)
      const dailySpendData = response[dataSource]?.daily_data
      const spendingData = getSpendingData(dailySpendData)

      setSpendingData(spendingData)
    }
    // Otherwise show alert modal directly
    togglePause()
  }

  React.useEffect(() => {
    // Wait for spendingData state change before showing alert modal
    if (spendingData) {
      togglePause()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spendingData])

  return (
    <a
      className={[
        'flex flex-row items-center',
        'no-underline',
        'px-3 py-1',
        'text-offwhite',
        'rounded-full',
        isDisabled ? 'bg-grey-light' : backgroundClasses,
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={onClick}
    >
      {Icon}
      {utils.capitalise(action)}
    </a>
  )
}

TargetingDailyBudgetPauseButton.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

TargetingDailyBudgetPauseButton.defaultProps = {
}

export default TargetingDailyBudgetPauseButton
