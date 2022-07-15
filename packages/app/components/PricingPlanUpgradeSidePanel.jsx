import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'

import { getProrationsPreview } from '@/app/helpers/billingHelpers'

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const { organization: { id: organizationId } } = artist
  const [currentStep, setCurrentStep] = React.useState(0)
  const [profilesToUpgrade, setProfilesToUpgrade] = React.useState({ [artistId]: 'growth' })
  const [prorationsPreview, setProrationsPreview] = React.useState(null)
  // const [error, setError] = React.useState(null)

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
      prorationsPreview,
    },
  )

  useAsyncEffect(async (isMounted) => {
    if (!Object.keys(profilesToUpgrade).length) return

    const { res, error } = await getProrationsPreview(organizationId, profilesToUpgrade)
    if (!isMounted()) return

    if (error) {
      // setError(error)

      return
    }

    setProrationsPreview(res)
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
