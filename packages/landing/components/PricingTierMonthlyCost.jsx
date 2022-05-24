import PropTypes from 'prop-types'

import copy from '@/landing/copy/PricingPageCopy'

const {
  currencies,
  currencyOptions,
} = copy

export default function PricingTierMonthlyCost({ amount, currency, showAnnualPricing }) {
  const currencySymbol = currencies[currency]
  return (
    <div
      className={[
        'flex',
        'items-center',
        amount === 0 && 'text-grey-3',
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
        <p className="self-start line-through text-grey-3">{amount}</p>
      )}
      <p
        className={[
          'text-7xl',
          'font-display',
          'font-bold',
          'pr-2',
          showAnnualPricing && amount > 0 && 'text-green',
        ].join(' ')}
      >
        {showAnnualPricing ? amount * 0.8 : amount}
      </p>
      <p>per month</p>
    </div>
  )
}

PricingTierMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(currencyOptions).isRequired,
  showAnnualPricing: PropTypes.bool,
}

PricingTierMonthlyCost.defaultProps = {
  showAnnualPricing: false,
}
