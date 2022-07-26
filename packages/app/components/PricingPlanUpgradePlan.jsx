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
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { name } = artist
  const [planPrefix] = plan.split('_')
  const features = pricingPlans.find(({ name }) => name === planPrefix)?.features
  const { growth: growthPlan, pro: proPlan } = pricingNumbers

  const handleChange = (plan) => {
    setPlan(getPricingPlanString(plan, false))
  }

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={next} trackComponentName="PricingPlanUpgradePlan">
        Upgrade to {capitalise(planPrefix)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [next, setSidePanelButton, planPrefix])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade {name}</h2>
      <PricingPlanUpgradePlanItem
        name="growth"
        plan={growthPlan}
        selectedPlan={planPrefix}
        isAnnualPricing={false}
        features={features}
        handleChange={handleChange}
        className="mb-4"
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        plan={proPlan}
        selectedPlan={planPrefix}
        isAnnualPricing={false}
        features={features}
        handleChange={handleChange}
      />
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
  plan: PropTypes.string,
  setPlan: PropTypes.func,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
}

PricingPlanUpgradePlan.defaultProps = {
  plan: '',
  setPlan: () => {},
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
}

export default PricingPlanUpgradePlan
