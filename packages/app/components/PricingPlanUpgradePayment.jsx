import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'

import { pricingNumbers } from '@/constants/pricing'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/global'

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
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
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(plan, monthlyCost)} />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.string.isRequired,
      plan: PropTypes.string.isRequired,
    }),
  ),
}

PricingPlanUpgradePayment.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: [],
}

export default PricingPlanUpgradePayment
