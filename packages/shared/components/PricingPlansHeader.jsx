import PropTypes from 'prop-types'

import PricingPeriodToggle from '@/PricingPeriodToggle'
import PricingCurrencySelect from '@/PricingCurrencySelect'

const PricingPlansHeader = ({
  currency,
  setCurrency,
  showAnnualPricing,
  setShowAnnualPricing,
  buttonPillClassName,
}) => {
  return (
    <div
      className={[
        'flex flex-column xs:flex-row sm:items-center xs:justify-between',
        "after:content-[''] after:flex-1",
        'mb-5',
      ].join(' ')}
    >
      <div className="flex flex-1 mb-2 xs:mb-0">
        <PricingCurrencySelect
          currency={currency}
          setCurrency={setCurrency}
          className="xs:ml-2 w-[75px]"
        />
      </div>
      <PricingPeriodToggle
        showAnnualPricing={showAnnualPricing}
        setShowAnnualPricing={setShowAnnualPricing}
        className="flex items-center"
        buttonPillClassName={buttonPillClassName}
      />
    </div>
  )
}

PricingPlansHeader.propTypes = {
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
  setShowAnnualPricing: PropTypes.func.isRequired,
  buttonPillClassName: PropTypes.string.isRequired,
}

export default PricingPlansHeader
