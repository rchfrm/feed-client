import React from 'react'
import PropTypes from 'prop-types'

import { getCurrencySymbol } from '@/helpers/utils'


const PricingPlanUpgradeMonthlyCostAndServiceFee = ({ currencyCode, plan, isAnnualPricing }) => {
  const currencySymbol = getCurrencySymbol(currencyCode)

  const monthlyCost = plan.monthlyCost[currencyCode]
  const { serviceFeePercentage } = plan
  const isBasic = monthlyCost === 0 && serviceFeePercentage === 0.1

  return (
    <div className="flex items-center">
      <div className="flex flex-col xs:flex-row items-center mr-3 xs:mr-8">
        <div className={[
          'flex',
          isBasic ? 'text-grey-3' : 'text-black',
        ].join(' ')}
        >
          <p className="text-2xl pr-1 mb-0">{currencySymbol}</p>
          {isAnnualPricing && ! isBasic && (
            <p className="self-start line-through text-xs text-grey-3">{monthlyCost}</p>
          )}
          <p className={[
            'mr-1 mb-0 text-2xl font-bold',
            isAnnualPricing && ! isBasic ? 'text-green' : null,
          ].join(' ')}
          >
            {isAnnualPricing && ! isBasic ? monthlyCost * 0.8 : monthlyCost}
          </p>
        </div>

        <p className="mb-0 text-xs">per month</p>
      </div>
      <div className={[
        'flex flex-col xs:flex-row items-center xs:mr-8',
        isBasic ? 'text-black' : 'text-grey-3',
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
  isAnnualPricing: PropTypes.bool,
}

PricingPlanUpgradeMonthlyCostAndServiceFee.defaultProps = {
  currencyCode: 'GBP',
  isAnnualPricing: false,
}

export default PricingPlanUpgradeMonthlyCostAndServiceFee
