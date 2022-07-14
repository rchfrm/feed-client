import React from 'react'

import Button from '@/elements/Button'

const PricingPlanUpgradePlan = ({
  setCurrentStep,
  setSidePanelButton,
}) => {
  const handleUpgrade = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = <Button version="insta" onClick={handleUpgrade} trackComponentName="PricingPlanUpgradeIntro">Upgrade to plan</Button>

    setSidePanelButton(button)
  }, [handleUpgrade, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profile</h2>
      <p className="mb-5">Growth or Pro?</p>
    </div>
  )
}

PricingPlanUpgradePlan.propTypes = {
}

PricingPlanUpgradePlan.defaultProps = {
}

export default PricingPlanUpgradePlan
