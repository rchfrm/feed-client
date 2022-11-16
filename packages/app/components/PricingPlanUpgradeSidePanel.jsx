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
import { setInitialPlan } from '@/app/helpers/billingHelpers'
import { useImmerReducer } from 'use-immer'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  orgLoading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  artistCurrency: state.artistCurrency,
  organizationArtists: state.organizationArtists,
})

const handleInitialize = (draftState, payload) => {
  const {
    orgArtists,
    selectedArtistID,
    selectedArtistPlan,
  } = payload
  if (!orgArtists || !selectedArtistID || !selectedArtistPlan) return draftState

  return orgArtists.reduce((acc, orgArtist) => {
    if (orgArtist.id === selectedArtistID) {
      acc[orgArtist.id] = selectedArtistPlan
    } else if (orgArtist.plan.includes('basic')) {
      acc[orgArtist.id] = 'growth'
    } else {
      const [planPrefix] = orgArtist.plan?.split('_') || 'growth'
      acc[orgArtist.id] = planPrefix
    }
    return acc
  }, {})
}

const handleUpdateProfilePlan = (draftState, payload) => {
  const { profileId, plan } = payload
  if (!profileId || !plan || !Object.hasOwn(draftState, profileId)) return draftState
  if (plan === 'basic') {
    return Object.keys(draftState).reduce((acc, id) => {
      if (id === profileId) {
        acc[id] = plan
      } else {
        acc[id] = 'none'
      }
      return acc
    }, draftState)
  }
  draftState[profileId] = plan
  return draftState
}

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
  const [, planPeriod] = artist?.plan?.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'
  const isUpgradeToPro = hasGrowthPlan && !hasCancelledPlan

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const {
    organization,
    orgLoading,
    artistCurrency,
    defaultPaymentMethod,
    organizationArtists,
  } = useBillingStore(getBillingStoreState)
  const hasBillingAccess = !orgLoading && !!organization.id
  const noOrgArtistsActive = organizationArtists.every((artist) => artist.status !== 'active')
  const currencyCode = defaultPaymentMethod?.currency || artistCurrency
  const isSettingBudget = section === 'set-budget'
  const canChooseBasic = hasCancelledPlan && isSettingBudget && noOrgArtistsActive

  const [currentStep, setCurrentStep] = React.useState(0)

  const [profilesToUpgrade, setProfilesToUpgrade] = useImmerReducer(profilesToUpgradeReducer, {})
  const [prorationsPreview, setProrationsPreview] = React.useState(null)
  const initPlan = setInitialPlan(artist.plan, canChooseBasic, isUpgradeToPro)

  React.useEffect(() => {
    if (!hasBillingAccess || profilesToUpgrade[artist.id]) return
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
      isAnnualPricing,
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
