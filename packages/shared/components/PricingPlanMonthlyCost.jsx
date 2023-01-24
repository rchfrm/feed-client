import PropTypes from 'prop-types'
import { currencies } from '@/constants/pricing'
import { getCurrencySymbol } from '@/helpers/utils'

export default function PricingPlanMonthlyCost({ amount, currencyCode, isManaged, showAnnualPricing }) {
  const currencySymbol = getCurrencySymbol(currencyCode)

  return (
    <div
      className={[
        'flex',
        'items-center',
        amount === 0 ? 'text-grey-dark' : null,
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
        <p className="self-start line-through text-grey-dark">{amount}</p>
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
      <p className="small--p">per month {! isManaged && 'per profile'}</p>
    </div>
  )
}

PricingPlanMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currencyCode: PropTypes.oneOf(currencies).isRequired,
  isManaged: PropTypes.bool,
  showAnnualPricing: PropTypes.bool,
}

PricingPlanMonthlyCost.defaultProps = {
  showAnnualPricing: false,
  isManaged: false,
}
