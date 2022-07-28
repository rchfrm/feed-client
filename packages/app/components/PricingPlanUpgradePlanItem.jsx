import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanUpgradeMonthlyCostAndServiceFee from '@/app/PricingPlanUpgradeMonthlyCostAndServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import RadioButton from '@/elements/RadioButton'
import MarkdownText from '@/elements/MarkdownText'

import { capitalise } from '@/helpers/utils'

import copy from '@/app/copy/global'

const PricingPlanUpgradePlanItem = ({
  name,
  plan,
  selectedPlan,
  isAnnualPricing,
  handleChange,
  features,
  className,
}) => {
  return (
    <>
      <div className={['flex items-center justify-between', className].join(' ')}>
        <RadioButton
          value={name}
          name={name}
          label={capitalise(name)}
          onChange={handleChange}
          checked={selectedPlan === name}
          className="mb-0 font-bold text-xl"
        />
        <PricingPlanUpgradeMonthlyCostAndServiceFee
          plan={plan}
          isAnnualPricing={isAnnualPricing}
        />
      </div>
      {selectedPlan === name && (
        <div className="my-6 pl-4">
          <p className="pl-1">Features:</p>
          <PricingPlanFeatures features={features} className="mb-4" />
          <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
        </div>
      )}
    </>
  )
}

PricingPlanUpgradePlanItem.propTypes = {
  name: PropTypes.string.isRequired,
  plan: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  isAnnualPricing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  features: PropTypes.array.isRequired,
  className: PropTypes.string,
}

PricingPlanUpgradePlanItem.defaultProps = {
  className: null,
}

export default PricingPlanUpgradePlanItem
