import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePlanItem from '@/app/PricingPlanUpgradePlanItem'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import { pricingNumbers, pricingPlans } from '@/constants/pricing'

import { capitalise } from '@/helpers/utils'
import { getPricingPlanString } from '@/app/helpers/billingHelpers'

const PricingPlanUpgradePlan = ({
  plan,
  setPlan,
  setCurrentStep,
  setSidePanelButton,
  currency,
  canChooseBasic,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { name, hasCancelledPlan } = artist
  const [planPrefix] = plan.split('_')
  const pricingPlan = pricingPlans.find(({ name }) => name === planPrefix)
  const {
    basic: basicPlanNumbers,
    growth: growthPlanNumbers,
    pro: proPlanNumbers,
  } = pricingNumbers

  const handleChange = (plan) => {
    setPlan(getPricingPlanString(plan, false))
  }

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={next} trackComponentName="PricingPlanUpgradePlan">
        {hasCancelledPlan ? 'Choose' : 'Update to'} {capitalise(planPrefix)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [next, setSidePanelButton, planPrefix, hasCancelledPlan])

  return (
    <div>
      <h2 className="mb-8 pr-12">
        {hasCancelledPlan ? 'Choose a plan' : `Upgrade ${name}`}
      </h2>
      {canChooseBasic && (
        <PricingPlanUpgradePlanItem
          name="basic"
          pricingPlan={pricingPlan}
          pricingPlanNumbers={basicPlanNumbers}
          selectedPlan={planPrefix}
          isAnnualPricing={false}
          handleChange={handleChange}
          currency={currency}
          className="mb-4"
        />
      )}
      <PricingPlanUpgradePlanItem
        name="growth"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={growthPlanNumbers}
        selectedPlan={planPrefix}
        isAnnualPricing={false}
        handleChange={handleChange}
        currency={currency}
        className="mb-4"
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={proPlanNumbers}
        selectedPlan={planPrefix}
        isAnnualPricing={false}
        handleChange={handleChange}
        currency={currency}
      />
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
  plan: PropTypes.string,
  setPlan: PropTypes.func,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }),
}

PricingPlanUpgradePlan.defaultProps = {
  plan: '',
  setPlan: () => {},
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  currency: {
    code: 'GBP',
  },
}

export default PricingPlanUpgradePlan
