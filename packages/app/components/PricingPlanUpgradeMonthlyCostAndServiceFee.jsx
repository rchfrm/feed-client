import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getCurrencySymbol } from '@/helpers/utils'

const PricingPlanUpgradeMonthlyCostAndServiceFee = ({ plan, isAnnualPricing }) => {
  const { artistCurrency } = React.useContext(ArtistContext)
  const currencySymbol = getCurrencySymbol(artistCurrency)

  const monthlyCost = plan.monthlyCost[artistCurrency]
  const { serviceFeePercentage } = plan

  return (
    <div className="flex items-center">
      <div className="flex flex-col xs:flex-row items-center mr-3 xs:mr-8">
        <div className="flex">
          <p className="text-2xl pr-1 mb-0">{currencySymbol}</p>
          {isAnnualPricing && (
            <p className="self-start line-through text-xs text-grey-3">{monthlyCost}</p>
          )}
          <p className={[
            'mr-1 mb-0 text-2xl font-bold',
            isAnnualPricing ? 'text-green' : null,
          ].join(' ')}
          >
            {isAnnualPricing ? monthlyCost * 0.8 : monthlyCost}
          </p>
        </div>

        <p className="mb-0 text-xs">per month</p>
      </div>
      <div className="flex flex-col xs:flex-row items-center xs:mr-8 text-grey-3">
        <p className="mr-2 mb-0 text-2xl">{serviceFeePercentage}%</p>
        <p className="mb-0 text-xs">service fee</p>
      </div>
    </div>
  )
}

PricingPlanUpgradeMonthlyCostAndServiceFee.propTypes = {
  plan: PropTypes.object.isRequired,
  isAnnualPricing: PropTypes.bool,
}

PricingPlanUpgradeMonthlyCostAndServiceFee.defaultProps = {
  isAnnualPricing: false,
}

export default PricingPlanUpgradeMonthlyCostAndServiceFee

