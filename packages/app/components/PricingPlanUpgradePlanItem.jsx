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
  pricingPlan,
  pricingPlanNumbers,
  selectedPlan,
  handleChange,
  currencyCode,
  className,
  disabled,
}) => {
  return (
    <>
      <div className={[
        'flex',
        'items-center',
        'justify-between',
        className,
        disabled ? 'pointer-events-none' : '',
      ].join(' ')}
      >
        <RadioButton
          value={name}
          name={name}
          label={capitalise(name)}
          onChange={handleChange}
          checked={selectedPlan === name}
          className={[
            'mb-0',
            'font-bold',
            'text-xl',
            disabled ? 'text-grey-3' : '',
          ].join(' ')}
        />
        <PricingPlanUpgradeMonthlyCostAndServiceFee
          currencyCode={currencyCode}
          plan={pricingPlanNumbers}
          disabled={disabled}
        />
      </div>
      {selectedPlan === name && (
        <div className="my-6 pl-4">
          <p className="pl-1">Features:</p>
          <PricingPlanFeatures plan={pricingPlan} currencyCode={currencyCode} className="mb-4" />
          <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
        </div>
      )}
    </>
  )
}

PricingPlanUpgradePlanItem.propTypes = {
  name: PropTypes.string.isRequired,
  pricingPlan: PropTypes.object.isRequired,
  pricingPlanNumbers: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  currencyCode: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

PricingPlanUpgradePlanItem.defaultProps = {
  className: null,
  currencyCode: 'GBP',
  disabled: false,
}

export default PricingPlanUpgradePlanItem
