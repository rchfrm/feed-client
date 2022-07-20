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
  error,
}) => {
  const [pricingPlan, setPricingPlan] = React.useState('growth')

  const { artistId, artist } = React.useContext(ArtistContext)
  const { name } = artist
  const features = pricingPlans.find(({ name }) => name === pricingPlan)?.features
  const { growth: growthPlan, pro: proPlan } = pricingNumbers
  const isDisabled = Boolean(error)

  const handleChange = (plan) => {
    setPricingPlan(plan)
  }

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={next} disabled={isDisabled} trackComponentName="PricingPlanUpgradePlan">
        Upgrade to {capitalise(pricingPlan)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={isDisabled ? brandColors.greyDark : brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [next, setSidePanelButton, pricingPlan, isDisabled])

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
  error: PropTypes.object,
}

PricingPlanUpgradePlan.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  setProfilesToUpgrade: () => {},
  error: null,
}

export default PricingPlanUpgradePlan
