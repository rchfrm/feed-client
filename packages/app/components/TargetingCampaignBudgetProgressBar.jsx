import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { formatCurrency } from '@/helpers/utils'

const TargetingCampaignBudgetProgressBar = ({
  campaignBudget,
  totalSpent,
  currency,
}) => {
  const {
    startDate,
    endDate,
    totalBudget,
  } = campaignBudget || {}

  const daysInPeriod = moment(endDate).diff(moment(startDate).startOf('day'), 'days') + 1
  const daysSinceStartDate = moment().diff(moment(startDate), 'days')
  const progressInPercentage = daysSinceStartDate > 0 ? (daysSinceStartDate / daysInPeriod) * 100 : 0

  return (
    <div className="h-24">
      <div className="w-full flex justify-between mb-1 text-xs pt-4">
        <div>{moment(startDate).format('DD MMM')}</div>
        <div>{moment(endDate).format('DD MMM')}</div>
      </div>
      <div className="h-4 mb-1 border-solid border-black border-2 rounded-full">
        <div
          className={['h-full', 'rounded-l-full', 'bg-fb'].join(' ')}
          style={{ width: `${progressInPercentage}%` }}
        />
      </div>
      <div className="w-full relative flex text-sm">
        <div
          className={['absolute', `${totalSpent ? '-translate-x-1/2 left-1/2' : null}`].join(' ')}
          style={{ left: `${progressInPercentage}%` }}
        >
          {formatCurrency(totalSpent, currency)}
        </div>
        <div className="ml-auto font-bold">{formatCurrency(totalBudget, currency, true)}</div>
      </div>
    </div>
  )
}

TargetingCampaignBudgetProgressBar.propTypes = {
  campaignBudget: PropTypes.object.isRequired,
  totalSpent: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudgetProgressBar.defaultProps = {
}

export default TargetingCampaignBudgetProgressBar
