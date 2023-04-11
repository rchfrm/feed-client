import PropTypes from 'prop-types'
import { currencies } from '@/constants/pricing'
import { getCurrencySymbol } from '@/helpers/utils'

const GetStartedPricingPlanMonthlyCost = ({
  amount,
  currency,
}) => {
  const currencySymbol = getCurrencySymbol(currency)

  return (
    <div
      className={[
        'flex items-center flex-col sm:flex-row',
        'mb-0 sm:mb-5 mr-2',
        amount === 0 ? 'text-grey-dark' : null,
      ].join(' ')}
    >
      <div className="flex items-center">
        <p
          className={[
            'text-2xl',
            'pr-1',
            'mb-0',
          ].join(' ')}
        >
          {currencySymbol}
        </p>
        <p
          className={[
            'text-2xl sm:text-7xl font-bold',
            'mb-0 pr-2',
          ].join(' ')}
        >
          {amount}
        </p>
      </div>
      <p className="text-xs sm:text-base mb-0 sm-mb-5">per month</p>
    </div>
  )
}

GetStartedPricingPlanMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
}

export default GetStartedPricingPlanMonthlyCost
