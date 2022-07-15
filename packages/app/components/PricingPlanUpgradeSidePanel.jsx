import React from 'react'
import PropTypes from 'prop-types'

const PricingPlanUpgradeSidePanel = ({ section }) => {
  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade your plan</h2>
      <p>Came from {section}..</p>
      <p className="mb-8">Additional details about upgrading ..</p>
    </div>
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

PricingPlanUpgradeSidePanel.defaultProps = {
}

export default PricingPlanUpgradeSidePanel
