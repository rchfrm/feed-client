import PropTypes from 'prop-types'

import copy from '@/landing/copy/PricingPageCopy'
import { formatNumber } from '@/helpers/utils'

const {
  currencies,
  currencyOptions,
} = copy

export default function PricingTierMonthlyCost({ amount, currency, isManaged, showAnnualPricing }) {
  const currencySymbol = currencies[currency]
  const formattedAmount = formatNumber(amount)
  return (
    <div
      className={[
        'flex',
        'items-center',
        amount === 0 ? 'text-grey-3' : null,
      ].join(' ')}
    >
      <p
        className={[
          'text-2xl',
          'pr-1',
        ].join(' ')}
      >
        {currencySymbol}
      </p>
      {showAnnualPricing && amount > 0 && (
        <p className="self-start line-through text-grey-3">{formattedAmount}</p>
      )}
      <p
        className={[
          'text-7xl',
          'font-display',
          'font-bold',
          'pr-2',
          showAnnualPricing && amount > 0 ? 'text-green' : null,
        ].join(' ')}
      >
        {showAnnualPricing ? formattedAmount * 0.8 : formattedAmount}
      </p>
      <p className="small--p">per month {!isManaged && 'per profile'}</p>
    </div>
  )
}

PricingTierMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(currencyOptions).isRequired,
  isManaged: PropTypes.bool,
  showAnnualPricing: PropTypes.bool,
}

PricingTierMonthlyCost.defaultProps = {
  showAnnualPricing: false,
  isManaged: false,
}
