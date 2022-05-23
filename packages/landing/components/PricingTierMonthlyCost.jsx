import PropTypes from 'prop-types'

const currencySymbols = {
  GBP: '£',
}

export default function PricingTierMonthlyCost({ amount, currency }) {
  const currencySymbol = currencySymbols[currency]
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
      <p
        className={[
          'text-7xl',
          'font-display',
          'font-bold',
          'pr-2',
        ].join(' ')}
      >
        {amount}
      </p>
      <p>per profile / per month</p>
    </div>
  )
}

PricingTierMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(Object.keys(currencySymbols)),
}

PricingTierMonthlyCost.defaultProps = {
  currency: 'GBP',
}
