import React from 'react'
import PropTypes from 'prop-types'

import { getCurrencySymbol } from '@/helpers/utils'


const PricingPlanUpgradeMonthlyCostAndServiceFee = ({ currencyCode, plan, disabled }) => {
  const currencySymbol = getCurrencySymbol(currencyCode)

  const monthlyCost = plan.monthlyCost[currencyCode]
  const { serviceFeePercentage } = plan
  const isFree = monthlyCost === 0 && serviceFeePercentage === 0

  return (
    <div className="flex items-center">
      <div className="flex flex-col xs:flex-row items-center mr-3 xs:mr-8">
        <div className={[
          'flex',
          isFree || disabled ? 'text-grey-dark' : 'text-black',
        ].join(' ')}
        >
          <p className="text-2xl pr-1 mb-0">{currencySymbol}</p>
          <p className={[
            'mr-1 mb-0 text-2xl font-bold',
          ].join(' ')}
          >
            {monthlyCost}
          </p>
        </div>

        <p className={[
          'mb-0 text-xs',
          disabled ? 'text-grey-3' : '',
        ].join(' ')}
        >
          per month
        </p>
      </div>
      <div className={[
        'flex flex-col xs:flex-row items-center xs:mr-8',
        isFree && ! disabled ? 'text-black' : 'text-grey-dark',
      ].join(' ')}
      >
        <p className="mr-2 mb-0 text-2xl">{serviceFeePercentage * 100}%</p>
        <p className="mb-0 text-xs">service fee</p>
      </div>
    </div>
  )
}

PricingPlanUpgradeMonthlyCostAndServiceFee.propTypes = {
  currencyCode: PropTypes.string,
  plan: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

PricingPlanUpgradeMonthlyCostAndServiceFee.defaultProps = {
  currencyCode: 'GBP',
  disabled: false,
}

export default PricingPlanUpgradeMonthlyCostAndServiceFee
