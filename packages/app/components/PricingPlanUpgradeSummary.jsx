import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/global'

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
  prorationsPreview,
}) => {
  const closeSidePanel = React.useCallback(() => {
    toggleSidePanel(false)
  }, [toggleSidePanel])

  React.useEffect(() => {
    const button = <Button onClick={closeSidePanel} trackComponentName="PricingPlanUpgradeSummary" isSidePanel>Ok</Button>

    setSidePanelButton(button)
  }, [closeSidePanel, setSidePanelButton])

  if (! prorationsPreview) return

  return (
    <div>
      <h2 className="mb-8 pr-12">Thank you!</h2>
      <MarkdownText markdown={copy.pricingUpgradeSummary(prorationsPreview)} />
    </div>
  )
}

PricingPlanUpgradeSummary.propTypes = {
  setSidePanelButton: PropTypes.func,
  toggleSidePanel: PropTypes.func,
  prorationsPreview: PropTypes.object,
}

PricingPlanUpgradeSummary.defaultProps = {
  setSidePanelButton: () => {},
  toggleSidePanel: () => {},
  prorationsPreview: null,
}

export default PricingPlanUpgradeSummary
