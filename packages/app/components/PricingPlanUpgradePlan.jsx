import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanPeriodSelect from '@/app/PricingPlanPeriodSelect'
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
  const [isAnnualPricing, setIsAnnualPricing] = React.useState(false)

  const { artistId, artist } = React.useContext(ArtistContext)
  const { hasGrowthPlan, name } = artist
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

  React.useEffect(() => {
    setProfilesToUpgrade({ [artistId]: getPricingPlanString(pricingPlan, isAnnualPricing) })
  }, [isAnnualPricing, pricingPlan, artistId, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade {name}</h2>
      {!hasGrowthPlan && (
        <div className="flex items-center mb-8">
          <p className="mr-1 mb-0">Period:</p>
          <PricingPlanPeriodSelect
            showAnnualPricing={isAnnualPricing.toString()}
            setShowAnnualPricing={setIsAnnualPricing}
            className="xs:ml-2 w-[108px]"
          />
        </div>
      )}
      <PricingPlanUpgradePlanItem
        name="growth"
        plan={growthPlan}
        selectedPlan={pricingPlan}
        isAnnualPricing={isAnnualPricing}
        features={features}
        handleChange={handleChange}
        className="mb-4"
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        plan={proPlan}
        selectedPlan={pricingPlan}
        isAnnualPricing={isAnnualPricing}
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
