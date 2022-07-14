import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanFeatures from '@/PricingPlanFeatures'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import RadioButtons from '@/elements/RadioButtons'

import brandColors from '@/constants/brandColors'
import { pricingPlans } from '@/constants/pricing'

import { capitalise } from '@/helpers/utils'

const PricingPlanUpgradePlan = ({
  setCurrentStep,
  setSidePanelButton,
  setProfilesToUpgrade,
}) => {
  const [pricingPlan, setPricingPlan] = React.useState('growth')

  const { artist: { name } } = React.useContext(ArtistContext)
  const features = pricingPlans.find(({ name }) => name === pricingPlan)?.features

  const pricingPlanOptions = [
    {
      value: 'growth',
      label: 'Growth',
      name: 'growth',
    },
    {
      value: 'pro',
      label: 'Pro',
      name: 'pro',
    },
  ]

  const handleChange = (plan) => {
    setProfilesToUpgrade({
      type: 'update-plan',
      payload: {
        profile: {
          name,
          plan,
        },
      },
    })

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

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade {name}</h2>
      <div className="mb-10">
        <RadioButtons
          options={pricingPlanOptions}
          onChange={handleChange}
          selectedValue={pricingPlan}
          trackGroupLabel="Upgrade plan"
        />
      </div>
      <p className="pl-1">Features:</p>
      <PricingPlanFeatures features={features} />
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
