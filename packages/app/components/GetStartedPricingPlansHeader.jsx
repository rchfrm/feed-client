import React from 'react'

import PricingPeriodToggle from '@/PricingPeriodToggle'
import PricingCurrencySelect from '@/PricingCurrencySelect'

const GetStartedPricingPlansHeader = ({
  currency,
  setCurrency,
  showAnnualPricing,
  setShowAnnualPricing,
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
        buttonPillClassName="bg-blue border-blue"
      />
    </div>
  )
}

GetStartedPricingPlansHeader.propTypes = {
}

GetStartedPricingPlansHeader.defaultProps = {
}

export default GetStartedPricingPlansHeader
