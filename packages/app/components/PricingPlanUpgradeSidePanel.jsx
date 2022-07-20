import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePaymentMethod from '@/app/PricingPlanUpgradePaymentMethod'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'

import Error from '@/elements/Error'

import { getPricingPlanString, getProrationsPreview, formatProrationsPreview } from '@/app/helpers/billingHelpers'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationArtists: state.organisationArtists,
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artistId, artist } = React.useContext(ArtistContext)

  const { hasGrowthPlan } = artist
  const [, planPeriod] = artist.plan.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'

  const [currentStep, setCurrentStep] = React.useState(0)
  const [profilesToUpgrade, setProfilesToUpgrade] = React.useState({
    [artistId]: getPricingPlanString(hasGrowthPlan ? 'pro' : 'growth', isAnnualPricing),
  })
  const [prorationsPreview, setProrationsPreview] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoadingProrations, setIsLoadingProrations] = React.useState(false)

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  const {
    defaultPaymentMethod,
    organisation,
    organisationArtists,
  } = useBillingStore(getBillingStoreState)
  const { id: organisationId } = organisation

  // Define plan upgrade flow steps
  const pricingPlanUpgradeSteps = [
    <PricingPlanUpgradeIntro key={0} />,
    ...(!hasGrowthPlan ? [<PricingPlanUpgradePlan key={1} />] : []),
    ...(!defaultPaymentMethod ? [<PricingPlanUpgradePaymentMethod key={2} />] : []),
    <PricingPlanUpgradePayment key={3} />,
    <PricingPlanUpgradeSummary key={4} />,
  ]

  // Pass additional props to every step component
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
      isLoadingProrations,
      error,
    },
  )

  // Fetch and format prorations preview when the profilesToUpgrade object changes
  useAsyncEffect(async (isMounted) => {
    if (!Object.keys(profilesToUpgrade).length) return

    setIsLoadingProrations(true)
    setError(null)

    const { res: prorationsPreview, error } = await getProrationsPreview(organisationId, profilesToUpgrade)
    if (!isMounted()) return

    if (error) {
      setError(error)
      setIsLoadingProrations(false)

      return
    }

    const formattedProrations = formatProrationsPreview({ profilesToUpgrade, organisationArtists, prorationsPreview })

    setProrationsPreview(formattedProrations)
    setIsLoadingProrations(false)
  }, [profilesToUpgrade])

  return (
    <>
      {StepComponent}
      <Error error={error} className="-mt-16" />
    </>
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

PricingPlanUpgradeSidePanel.defaultProps = {
}

export default PricingPlanUpgradeSidePanel
