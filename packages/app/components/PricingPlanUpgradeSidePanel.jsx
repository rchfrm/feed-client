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
import { handleInitialize, handleUpdateProfilePlan, setInitialPlan } from '@/app/helpers/billingHelpers'
import { useImmerReducer } from 'use-immer'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  orgLoading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  artistCurrency: state.artistCurrency,
  organizationArtists: state.organizationArtists,
  canChooseFree: state.canChooseFree,
})

const profilesToUpgradeReducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action
  switch (actionType) {
    case 'initialize':
      return handleInitialize(draftState, payload)
    case 'update-profile-plan':
      return handleUpdateProfilePlan(draftState, payload)
    default:
      throw new Error(`Unable to find ${actionType} in profilesToUpgradeReducer`)
  }
}

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artist } = React.useContext(ArtistContext)
  const { hasGrowthPlan, hasCancelledPlan } = artist
  const isUpgradeToPro = hasGrowthPlan && ! hasCancelledPlan

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const {
    organization,
    orgLoading,
    artistCurrency,
    defaultPaymentMethod,
    organizationArtists,
  } = useBillingStore(getBillingStoreState)
  const canChooseFree = useBillingStore(getBillingStoreState).canChooseFree && section === 'set-budget'

  const hasBillingAccess = ! orgLoading && !! organization.id
  const currencyCode = defaultPaymentMethod?.currency || artistCurrency

  const [currentStep, setCurrentStep] = React.useState(0)

  const [profilesToUpgrade, setProfilesToUpgrade] = useImmerReducer(profilesToUpgradeReducer, {})
  const [prorationsPreview, setProrationsPreview] = React.useState(null)
  const initPlan = setInitialPlan(artist, canChooseFree, isUpgradeToPro)
  const [stripePromise] = React.useState(() => loadStripe(process.env.stripe_provider))

  React.useEffect(() => {
    if (! hasBillingAccess || profilesToUpgrade[artist.id]) return

    setProfilesToUpgrade({
      type: 'initialize',
      payload: {
        orgArtists: organizationArtists,
        selectedArtistID: artist.id,
        selectedArtistPlan: initPlan,
      },
    })
  }, [artist.id, hasBillingAccess, initPlan, organizationArtists, profilesToUpgrade, setProfilesToUpgrade])

  // Define steps of plan upgrade flow
  const pricingPlanUpgradeSteps = React.useMemo(() => {
    const steps = [<PricingPlanUpgradeIntro key={0} />]
    if (! hasBillingAccess) {
      return steps
    }

    if (! isUpgradeToPro) {
      steps.push(<PricingPlanUpgradePlan key={1} />)
    }

    if (! defaultPaymentMethod) {
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
      canChooseFree,
      hasBillingAccess,
    },
  )

  return (
    <Elements stripe={stripePromise}>
      {StepComponent}
    </Elements>
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

export default PricingPlanUpgradeSidePanel
