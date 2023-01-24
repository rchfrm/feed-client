import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePlanItem from '@/app/PricingPlanUpgradePlanItem'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import { pricingNumbers, pricingPlans } from '@/constants/pricing'

import { capitalise } from '@/helpers/utils'

const PricingPlanUpgradePlan = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  setCurrentStep,
  setSidePanelButton,
  currencyCode,
  canChooseBasic,
  isAnnualPricing,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { name, hasCancelledPlan } = artist
  const artistPlan = profilesToUpgrade[artist.id]
  const pricingPlan = pricingPlans.find(({ name }) => name === artistPlan)
  const {
    basic: basicPlanNumbers,
    growth: growthPlanNumbers,
    pro: proPlanNumbers,
  } = pricingNumbers

  const handleChange = (plan) => {
    setProfilesToUpgrade({
      type: 'update-profile-plan',
      payload: {
        profileId: artist.id,
        plan,
      },
    })
  }

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={next} trackComponentName="PricingPlanUpgradePlan">
        {hasCancelledPlan ? 'Choose' : 'Update to'} {capitalise(artistPlan)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.offwhite}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [next, setSidePanelButton, artistPlan, hasCancelledPlan])

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
          selectedPlan={artistPlan}
          isAnnualPricing={isAnnualPricing}
          handleChange={handleChange}
          currencyCode={currencyCode}
          className="mb-4"
        />
      )}
      <PricingPlanUpgradePlanItem
        name="growth"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={growthPlanNumbers}
        selectedPlan={artistPlan}
        isAnnualPricing={isAnnualPricing}
        handleChange={handleChange}
        currencyCode={currencyCode}
        className="mb-4"
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={proPlanNumbers}
        selectedPlan={artistPlan}
        isAnnualPricing={isAnnualPricing}
        handleChange={handleChange}
        currencyCode={currencyCode}
      />
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['basic', 'growth', 'pro', 'none'])),
  setProfilesToUpgrade: PropTypes.func,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  currencyCode: PropTypes.string,
}

PricingPlanUpgradePlan.defaultProps = {
  profilesToUpgrade: {},
  setProfilesToUpgrade: () => {},
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  currencyCode: 'GBP',
}

export default PricingPlanUpgradePlan
