import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const pricingPlanUpgradeSteps = [
    {
      id: 0,
      component: <PricingPlanUpgradeIntro />,
    },
    {
      id: 1,
      component: <PricingPlanUpgradePlan />,
    },
    {
      id: 2,
      component: <PricingPlanUpgradePayment />,
    },
    {
      id: 3,
      component: <PricingPlanUpgradeSummary />,
    },
  ]

  const StepComponent = React.cloneElement(
    pricingPlanUpgradeSteps[currentStep].component,
    {
      section,
      setCurrentStep,
      setSidePanelButton,
      toggleSidePanel,
    },
  )

  return (
    StepComponent
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

PricingPlanUpgradeSidePanel.defaultProps = {
}

export default PricingPlanUpgradeSidePanel
