import React from 'react'
import PropTypes from 'prop-types'

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  const pricingPlanUpgradeSteps = [
    {
      id: 0,
      title: '',
      component: '',
    },
    {
      id: 1,
      title: '',
      component: '',
    },
    {
      id: 2,
      title: '',
      component: '',
    },
    {
      id: 3,
      title: '',
      component: '',
    },

  ]

  return (
    <div>
      {pricingPlanUpgradeSteps[currentStep]}
    </div>
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

PricingPlanUpgradeSidePanel.defaultProps = {
}

export default PricingPlanUpgradeSidePanel
