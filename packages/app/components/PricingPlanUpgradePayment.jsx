import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { pricingNumbers } from '@/constants/pricing'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/global'
import PricingPlanUpgradePaymentProfilesList from './PricingPlanUpgradePaymentProfilesList'

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
}) => {
  const [profile] = profilesToUpgrade
  const { plan } = profile
  const monthlyCost = pricingNumbers[plan].monthlyCost.GBP

  const handlePayment = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])


  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={handlePayment} trackComponentName="PricingPlanUpgradePayment">
        Pay £{monthlyCost}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [handlePayment, setSidePanelButton, monthlyCost])

  return (
    <div>
      <h2 className="mb-8 pr-12">Additional profiles</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(plan, monthlyCost)} className="mb-8" />
      <PricingPlanUpgradePaymentProfilesList
        profilesToUpgrade={profilesToUpgrade}
        setProfilesToUpgrade={setProfilesToUpgrade}
      />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      plan: PropTypes.string,
    }),
  ),
}

PricingPlanUpgradePayment.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: [],
}

export default PricingPlanUpgradePayment
