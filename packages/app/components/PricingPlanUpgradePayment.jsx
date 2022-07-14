import React from 'react'

import Button from '@/elements/Button'

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
}) => {
  const handlePayment = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = <Button version="insta" onClick={handlePayment} trackComponentName="PricingPlanUpgradePayment">Pay £25</Button>

    setSidePanelButton(button)
  }, [handlePayment, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">Additional profiles</h2>
      <p className="mb-5">Would you like to add additional profiles to Feed at the same time?</p>
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
}

PricingPlanUpgradePayment.defaultProps = {
}

export default PricingPlanUpgradePayment
