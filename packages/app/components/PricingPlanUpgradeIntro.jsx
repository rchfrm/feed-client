import React from 'react'

import Button from '@/elements/Button'

const PricingPlanUpgradeIntro = ({
  section,
  setCurrentStep,
  setSidePanelButton,
}) => {
  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = <Button version="insta" onClick={next} trackComponentName="PricingPlanUpgradeIntro">Upgrade</Button>

    setSidePanelButton(button)
  }, [next, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">Looking to {section}</h2>
      <p className="mb-5">Some text about the specific feature</p>
    </div>
  )
}

PricingPlanUpgradeIntro.propTypes = {
}

PricingPlanUpgradeIntro.defaultProps = {
}

export default PricingPlanUpgradeIntro

