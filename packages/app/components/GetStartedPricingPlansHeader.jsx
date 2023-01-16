import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import PricingPeriodToggle from '@/PricingPeriodToggle'
import GetStartedPricingPeriodSelect from '@/app/GetStartedPricingPeriodSelect'
import PricingCurrencySelect from '@/PricingCurrencySelect'

const GetStartedPricingPlansHeader = ({
  currency,
  setCurrency,
  showAnnualPricing,
  setShowAnnualPricing,
}) => {
  const isDesktopLayout = useBreakpointTest('xs')

  return (
    <div
      className={[
        'flex flex-row items-center justify-between',
        "xs:after:content-[''] xs:after:flex-1",
        'mb-5',
      ].join(' ')}
    >
      <div className="flex flex-1">
        <PricingCurrencySelect
          currency={currency}
          setCurrency={setCurrency}
          className="xs:ml-2 w-[75px]"
        />
      </div>
      {isDesktopLayout ? (
        <PricingPeriodToggle
          showAnnualPricing={showAnnualPricing}
          setShowAnnualPricing={setShowAnnualPricing}
          className="flex items-center"
          buttonPillClassName="bg-yellow border-yellow"
        />
      ) : (
        <GetStartedPricingPeriodSelect
          showAnnualPricing={showAnnualPricing.toString()}
          setShowAnnualPricing={setShowAnnualPricing}
          className="xs:ml-2 w-[108px]"
        />
      )}
    </div>
  )
}

GetStartedPricingPlansHeader.propTypes = {
  showAnnualPricing: PropTypes.bool.isRequired,
  setShowAnnualPricing: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
}

GetStartedPricingPlansHeader.defaultProps = {
}

export default GetStartedPricingPlansHeader
