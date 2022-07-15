import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artistId } = React.useContext(ArtistContext)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [profilesToUpgrade, setProfilesToUpgrade] = React.useState({ [artistId]: 'growth' })

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const pricingPlanUpgradeSteps = [
    <PricingPlanUpgradeIntro key={0} />,
    <PricingPlanUpgradePlan key={1} />,
    <PricingPlanUpgradePayment key={2} />,
    <PricingPlanUpgradeSummary key={3} />,
  ]

  const StepComponent = React.cloneElement(
    pricingPlanUpgradeSteps[currentStep],
    {
      section,
      profilesToUpgrade,
      setProfilesToUpgrade,
      setCurrentStep,
      setSidePanelButton,
      toggleSidePanel,
    },
  )

  React.useEffect(() => {
    if (!Object.keys(profilesToUpgrade).length) return

    console.log(profilesToUpgrade)
  }, [profilesToUpgrade])

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
