
import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

const GetStartedPricingPeriodSelect = ({ showAnnualPricing, setShowAnnualPricing, className }) => {
  const handleChange = (e) => {
    setShowAnnualPricing(e.target.value === 'true' || false)
  }

  const options = [
    {
      name: 'Monthly',
      value: 'false',
    },
    {
      name: 'Annual',
      value: 'true',
    },
  ]

  return (
    <div
      className={[
        'flex',
        'items-center',
        className,
      ].join(' ')}
    >
      <Select
        selectedValue={showAnnualPricing}
        handleChange={handleChange}
        name="GetStartedPricingPeriodSelect"
        options={options}
        version="small"
        className={[
          'w-full',
          'm-w-100',
          'mb-0',
        ].join(' ')}
      />
    </div>
  )
}

GetStartedPricingPeriodSelect.propTypes = {
  showAnnualPricing: PropTypes.string.isRequired,
  setShowAnnualPricing: PropTypes.func.isRequired,
  className: PropTypes.string,
}

GetStartedPricingPeriodSelect.defaultProps = {
  className: null,
}

export default GetStartedPricingPeriodSelect
