import PropTypes from 'prop-types'
import { getCurrencySymbol } from '@/helpers/utils'
import { currencies } from '@/constants/pricing'

export default function PricingTierMonthlyCost({ amount, currency, isManaged, showAnnualPricing }) {
  const currencySymbol = getCurrencySymbol(currency)
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
        <p className="self-start line-through text-grey-3">{amount}</p>
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
        {showAnnualPricing ? amount * 0.8 : amount}
      </p>
      <p className="small--p">per month {!isManaged && 'per profile'}</p>
    </div>
  )
}

PricingTierMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
  isManaged: PropTypes.bool,
  showAnnualPricing: PropTypes.bool,
}

PricingTierMonthlyCost.defaultProps = {
  showAnnualPricing: false,
  isManaged: false,
}
