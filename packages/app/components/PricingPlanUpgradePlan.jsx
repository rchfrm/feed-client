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
  setCurrentStep,
  setSidePanelButton,
  setProfilesToUpgrade,
}) => {
  const [pricingPlan, setPricingPlan] = React.useState('growth')

  const { artistId, artist } = React.useContext(ArtistContext)
  const { name } = artist
  const features = pricingPlans.find(({ name }) => name === pricingPlan)?.features
  const { growth: growthPlan, pro: proPlan } = pricingNumbers

  const handleChange = (plan) => {
    setPricingPlan(plan)
  }

  const handleUpgrade = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={handleUpgrade} trackComponentName="PricingPlanUpgradePlan">
        Upgrade to {capitalise(pricingPlan)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [handleUpgrade, setSidePanelButton, pricingPlan])

  // Update the profiles to upgrade state
  React.useEffect(() => {
    setProfilesToUpgrade({ [artistId]: getPricingPlanString(pricingPlan, false) })
  }, [pricingPlan, artistId, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade {name}</h2>
      <PricingPlanUpgradePlanItem
        name="growth"
        plan={growthPlan}
        selectedPlan={pricingPlan}
        isAnnualPricing={false}
        features={features}
        handleChange={handleChange}
        className="mb-4"
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        plan={proPlan}
        selectedPlan={pricingPlan}
        isAnnualPricing={false}
        features={features}
        handleChange={handleChange}
      />
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  setProfilesToUpgrade: PropTypes.func,
}

PricingPlanUpgradePlan.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  setProfilesToUpgrade: () => {},
}

export default PricingPlanUpgradePlan
