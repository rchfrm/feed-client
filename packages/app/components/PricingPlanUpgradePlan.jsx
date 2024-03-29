import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePlanItem from '@/app/PricingPlanUpgradePlanItem'

import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'

import { pricingNumbers, pricingPlans } from '@/constants/pricing'

import { capitalise } from '@/helpers/utils'

const PricingPlanUpgradePlan = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  setCurrentStep,
  setSidePanelButton,
  currencyCode,
  canChooseFree,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { name, hasCancelledPlan, status } = artist
  const artistPlan = profilesToUpgrade[artist.id]
  const pricingPlan = pricingPlans.find(({ name }) => name === artistPlan)
  const {
    free: freePlanNumbers,
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
      <Button
        onClick={next}
        trackComponentName="PricingPlanUpgradePlan"
        isSidePanel
      >
        {hasCancelledPlan ? 'Choose' : 'Update to'} {capitalise(artistPlan)}
        <ArrowIcon
          className="ml-1"
          direction="right"
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
      {canChooseFree && (
        <PricingPlanUpgradePlanItem
          name="free"
          pricingPlan={pricingPlan}
          pricingPlanNumbers={freePlanNumbers}
          selectedPlan={artistPlan}
          handleChange={handleChange}
          currencyCode={currencyCode}
          className="mb-4"
          disabled={artistPlan !== 'free' && status === 'incomplete'}
        />
      )}
      <PricingPlanUpgradePlanItem
        name="growth"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={growthPlanNumbers}
        selectedPlan={artistPlan}
        handleChange={handleChange}
        currencyCode={currencyCode}
        className="mb-4"
        disabled={artistPlan !== 'growth' && status === 'incomplete'}
      />
      <PricingPlanUpgradePlanItem
        name="pro"
        pricingPlan={pricingPlan}
        pricingPlanNumbers={proPlanNumbers}
        selectedPlan={artistPlan}
        handleChange={handleChange}
        currencyCode={currencyCode}
        disabled={artistPlan !== 'pro' && status === 'incomplete'}
      />
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['free', 'growth', 'pro', 'none'])),
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
