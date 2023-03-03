import PropTypes from 'prop-types'
import { currencies } from '@/constants/pricing'
import { getCurrencySymbol } from '@/helpers/utils'

export default function PricingPlanMonthlyCost({ amount, currencyCode }) {
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
      <p
        className={[
          'text-7xl',
          'font-bold',
          'pr-2',
        ].join(' ')}
      >
        {amount}
      </p>
      <p className="small--p">per month per profile</p>
    </div>
  )
}

PricingPlanMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currencyCode: PropTypes.oneOf(currencies).isRequired,
}
