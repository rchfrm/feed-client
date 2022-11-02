import React from 'react'
import PropTypes from 'prop-types'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePaymentMethod from '@/app/PricingPlanUpgradePaymentMethod'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'
import { getPricingPlanString } from '@/app/helpers/billingHelpers'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  orgLoading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  artistCurrency: state.artistCurrency,
  organizationArtists: state.organizationArtists,
})

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artist } = React.useContext(ArtistContext)
  const {
    organization,
    orgLoading,
    artistCurrency,
    defaultPaymentMethod,
    organizationArtists,
  } = useBillingStore(getBillingStoreState)

  const hasBillingAccess = !orgLoading && !!organization.id
  const { hasGrowthPlan, hasCancelledPlan } = artist
  const [, planPeriod] = artist?.plan?.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'
  const isUpgradeToPro = hasGrowthPlan && !hasCancelledPlan
  // TODO: What isUpgradeToPro used for? Can it be replaced by an array of "pro-only" features?
  const isSettingBudget = section === 'set-budget'
  const noOrgArtistsActive = organizationArtists.every(artist => artist.status !== 'active')
  const canChooseBasic = hasCancelledPlan && isSettingBudget && noOrgArtistsActive

  const [currentStep, setCurrentStep] = React.useState(0)
  const [profilesToUpgrade, setProfilesToUpgrade] = React.useState(null)
  const [prorationsPreview, setProrationsPreview] = React.useState(null)
  // TODO FD-1426 : Fallback if the artist has no plan
  // TODO FD-1426 : Don't automatically also upgrade other artists in org if reactivating
  const initPlan = canChooseBasic
    ? artist.plan
    : getPricingPlanString(isUpgradeToPro ? 'pro' : 'growth', isAnnualPricing)
  const [plan, setPlan] = React.useState(initPlan)

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  const currencyCode = defaultPaymentMethod?.currency || artistCurrency

  // Define steps of plan upgrade flow
  const pricingPlanUpgradeSteps = React.useMemo(() => {
    const steps = [<PricingPlanUpgradeIntro key={0} />]
    if (!hasBillingAccess) {
      return steps
    }

    if (!isUpgradeToPro) {
      steps.push(<PricingPlanUpgradePlan key={1} />)
    }

    if (!defaultPaymentMethod) {
      steps.push(<PricingPlanUpgradePaymentMethod key={2} />)
    }

    steps.push(<PricingPlanUpgradePayment key={3} />, <PricingPlanUpgradeSummary key={4} />)

    return steps
  // eslint-disable-next-line
  }, [defaultPaymentMethod, hasBillingAccess])

  // Pass additional props to every step component
  const StepComponent = React.cloneElement(
    pricingPlanUpgradeSteps[currentStep],
    {
      section,
      plan,
      setPlan,
      profilesToUpgrade,
      setProfilesToUpgrade,
      prorationsPreview,
      setProrationsPreview,
      currentStep,
      setCurrentStep,
      setSidePanelButton,
      toggleSidePanel,
      currencyCode,
      isUpgradeToPro,
      canChooseBasic,
      hasBillingAccess,
    },
  )

  return (
    StepComponent
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

export default PricingPlanUpgradeSidePanel
