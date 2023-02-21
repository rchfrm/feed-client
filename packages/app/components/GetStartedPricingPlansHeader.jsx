import React from 'react'
import PropTypes from 'prop-types'
import PricingCurrencySelect from '@/PricingCurrencySelect'

const GetStartedPricingPlansHeader = ({
  currency,
  setCurrency,
}) => {
  return (
    <div
      className={[
        'flex flex-row sm:justify-center',
        'mb-5',
      ].join(' ')}
    >
      <PricingCurrencySelect
        currency={currency}
        setCurrency={setCurrency}
        className="xs:ml-2 w-[75px]"
      />
    </div>
  )
}

GetStartedPricingPlansHeader.propTypes = {
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
}

GetStartedPricingPlansHeader.defaultProps = {
}

export default GetStartedPricingPlansHeader
