import React from 'react'

import Button from '@/elements/Button'

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
}) => {
  const closeSidePanel = React.useCallback(() => {
    toggleSidePanel(false)
  }, [toggleSidePanel])

  React.useEffect(() => {
    const button = <Button version="green" onClick={closeSidePanel} trackComponentName="PricingPlanUpgradeSummary">Ok</Button>

    setSidePanelButton(button)
  }, [closeSidePanel, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">Thank you!</h2>
      <p className="mb-5">Profile has been upgraded to Growth.</p>
    </div>
  )
}

PricingPlanUpgradeSummary.propTypes = {
}

PricingPlanUpgradeSummary.defaultProps = {
}

export default PricingPlanUpgradeSummary
