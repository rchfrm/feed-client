import React from 'react'
// import PropTypes from 'prop-types'

const PricingPlanUpgradePaymentProrations = () => {
  return (
    <>
      <p className="font-bold">To pay today:</p>
      <ul className="pl-6 list-disc">
        <li>£20 to upgrade INKA UPENDO to Pro ^</li>
        <li>No change to Jupiter Grey</li>
      </ul>
      <p className="text-xs">^Covering the remaining 12 days of the current billing period.</p>
      <p className="font-bold">Your next invoice will be for £75:</p>
      <ul className="pl-6 list-disc">
        <li>£50 for INKA UPENDO on Pro *</li>
        <li>£25 for Jupiter Grey on Growth *</li>
      </ul>
    </>
  )
}

PricingPlanUpgradePaymentProrations.propTypes = {
  // prorationsPreview: PropTypes.object.isRequired,
}

PricingPlanUpgradePaymentProrations.defaultProps = {
}

export default PricingPlanUpgradePaymentProrations
