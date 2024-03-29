import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PricingPlanUpgradePaymentProfilesList from '@/app/PricingPlanUpgradePaymentProfilesList'
import PricingProrationsLoader from '@/app/PricingProrationsLoader'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowIcon from '@/icons/ArrowIcon'
import Error from '@/elements/Error'
import { formatCurrency } from '@/helpers/utils'
import { formatProfilesToUpgrade, upgradeProfiles } from '@/app/helpers/billingHelpers'
import copy from '@/app/copy/global'
import { useStripe } from '@stripe/react-stripe-js'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationArtists: state.organizationArtists,
  updateOrganizationArtists: state.updateOrganizationArtists,
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
  setProrationsPreview,
  canChooseFree,
}) => {
  const [upgradableProfiles, setUpgradableProfiles] = React.useState([])
  const hasMultipleUpgradableProfiles = upgradableProfiles.length > 1
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, artist, setPlan, setStatus } = React.useContext(ArtistContext)
  const { name } = artist
  const isFreePlan = Object.values(profilesToUpgrade).some((plan) => plan === 'free')

  const stripe = useStripe()

  const { currency, prorations } = prorationsPreview || {}
  const amount = isFreePlan ? 0 : prorations?.amount
  const isDisabled = (! isFreePlan && ! amount) || Boolean(error)

  const {
    organizationArtists,
    organization,
    updateOrganizationArtists,
    defaultPaymentMethod,
  } = useBillingStore(getBillingStoreState, shallow)
  const { id: organizationId } = organization

  const upgradePlan = React.useCallback(async () => {
    setIsLoading(true)
    const profilesWithPlan = formatProfilesToUpgrade(profilesToUpgrade)
    const { res: { clientSecret, profiles }, error } = await upgradeProfiles(organizationId, profilesWithPlan)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    const profileUpdated = profiles.find((profile) => profile.id === artistId)
    setStatus(profileUpdated.status)
    setPlan(profileUpdated)


    if (profileUpdated.plan === 'active' || ! clientSecret) {
      updateOrganizationArtists(profiles)
      setCurrentStep((currentStep) => currentStep + 1)
      setIsLoading(false)
      return
    }

    const { error: confirmPaymentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: defaultPaymentMethod.id,
    })

    if (confirmPaymentError) {
      updateOrganizationArtists(profiles)
      setError(confirmPaymentError)
      setIsLoading(false)
      return
    }

    setStatus('active')
    const upgradedProfilesWithActiveStatus = profiles.map((profile) => {
      if (profilesWithPlan[profile.id]) {
        profile.status = 'active'
      }
      return profile
    })
    updateOrganizationArtists(upgradedProfilesWithActiveStatus)

    setCurrentStep((currentStep) => currentStep + 1)
    setIsLoading(false)
  }, [profilesToUpgrade, organizationId, setStatus, setPlan, updateOrganizationArtists, stripe, defaultPaymentMethod, setCurrentStep, artistId])

  React.useEffect(() => {
    const button = (
      <Button
        onClick={upgradePlan}
        isDisabled={isDisabled}
        isLoading={isLoading}
        trackComponentName="PricingPlanUpgradePayment"
        isSidePanel
      >
        {(isFreePlan && amount === 0
          ? `Confirm (${formatCurrency(amount, currency, true)})`
          : `Pay ${formatCurrency(amount, currency)}`
        )}
        <ArrowIcon
          className="ml-1"
          direction="right"
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [upgradePlan, setSidePanelButton, amount, isDisabled, currency, isLoading, isFreePlan])

  React.useEffect(() => {
    const currentProfile = organizationArtists.find((profile) => profile.id === artistId)
    const isUpgradeToFree = profilesToUpgrade[artistId] === 'free'
    if (isUpgradeToFree) {
      setUpgradableProfiles([currentProfile])
      return
    }
    // Filter out the current profile and any with an active pro plan
    const filteredProfiles = organizationArtists.filter((profile) => {
      const [planPrefix] = profile?.plan?.split('_') || []

      return profile.id !== artistId
        && ! (planPrefix === 'pro' && profile.status === 'active')
    })

    // Make sure that the currently active profile is the first item in the array
    setUpgradableProfiles([currentProfile, ...filteredProfiles])
  }, [artistId, organizationArtists, profilesToUpgrade, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profile{hasMultipleUpgradableProfiles ? 's' : ''}</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(hasMultipleUpgradableProfiles, name, profilesToUpgrade[artistId])} className="mb-8" />
      {hasMultipleUpgradableProfiles && (
        <PricingPlanUpgradePaymentProfilesList
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          profiles={upgradableProfiles}
          canChooseFree={canChooseFree}
        />
      )}
      {! isFreePlan && (
        <PricingProrationsLoader
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          prorationsPreview={prorationsPreview}
          setProrationsPreview={setProrationsPreview}
        />
      )}
      <Error error={error} />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['free', 'growth', 'pro', 'none'])),
  setProfilesToUpgrade: PropTypes.func,
  prorationsPreview: PropTypes.object,
  setProrationsPreview: PropTypes.func,
}

PricingPlanUpgradePayment.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: {},
  setProfilesToUpgrade: () => {},
  prorationsPreview: null,
  setProrationsPreview: () => {},
}

export default PricingPlanUpgradePayment
