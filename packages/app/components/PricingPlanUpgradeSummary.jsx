import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import { formatProrationsPreview } from '@/app/helpers/billingHelpers'

import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
  profilesToUpgrade,
  prorationsPreview,
}) => {
  const [formattedProrationsPreview, setFormattedProrationsPreview] = React.useState(null)
  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)

  React.useEffect(() => {
    const formattedProrations = formatProrationsPreview({ profilesToUpgrade, organisationArtists, prorationsPreview })

    setFormattedProrationsPreview(formattedProrations)
  }, [organisationArtists, profilesToUpgrade, prorationsPreview])

  const closeSidePanel = React.useCallback(() => {
    toggleSidePanel(false)
  }, [toggleSidePanel])

  React.useEffect(() => {
    const button = <Button version="green" onClick={closeSidePanel} trackComponentName="PricingPlanUpgradeSummary">Ok</Button>

    setSidePanelButton(button)
  }, [closeSidePanel, setSidePanelButton])

  if (!formattedProrationsPreview) return

  return (
    <div>
      <h2 className="mb-8 pr-12">Thank you!</h2>
      <MarkdownText markdown={copy.pricingUpgradeSummary(formattedProrationsPreview)} />
    </div>
  )
}

PricingPlanUpgradeSummary.propTypes = {
  setSidePanelButton: PropTypes.func,
  toggleSidePanel: PropTypes.func,
  profilesToUpgrade: PropTypes.objectOf(PropTypes.string),
  prorationsPreview: PropTypes.object,

}

PricingPlanUpgradeSummary.defaultProps = {
  setSidePanelButton: () => {},
  toggleSidePanel: () => {},
  profilesToUpgrade: null,
  prorationsPreview: null,
}

export default PricingPlanUpgradeSummary
