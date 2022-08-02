import PropTypes from 'prop-types'
import { currencies } from '@/constants/pricing'
import { getCurrencySymbol } from '@/helpers/utils'

const GetStartedPricingPlanMonthlyCost = ({
  amount,
  currency,
  showAnnualPricing,
  isDisabled,
}) => {
  const currencySymbol = getCurrencySymbol(currency)

  return (
    <div
      className={[
        'flex items-center flex-col sm:flex-row',
        'mb-0 sm:mb-5 mr-2',
        amount === 0 || isDisabled ? 'text-grey-3' : null,
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
        {showAnnualPricing && amount > 0 && (
          <p className="self-start line-through text-grey-3">{amount}</p>
        )}
        <p
          className={[
            'text-2xl sm:text-7xl font-display font-bold',
            'mb-0 pr-2',
            showAnnualPricing && amount > 0 && !isDisabled ? 'text-green' : null,
          ].join(' ')}
        >
          {showAnnualPricing ? amount * 0.8 : amount}
        </p>
      </div>
      <p className="text-xs sm:text-base mb-0 sm-mb-5">per month</p>
    </div>
  )
}

GetStartedPricingPlanMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
  showAnnualPricing: PropTypes.bool,
  isDisabled: PropTypes.bool.isRequired,
}

GetStartedPricingPlanMonthlyCost.defaultProps = {
  showAnnualPricing: false,
}

export default GetStartedPricingPlanMonthlyCost
