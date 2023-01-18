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

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationArtists: state.organizationArtists,
  updateOrganizationArtists: state.updateOrganizationArtists,
})

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
  setProrationsPreview,
  canChooseBasic,
  isAnnualPricing,
}) => {
  const [upgradableProfiles, setUpgradableProfiles] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, artist, setPlan, setStatus } = React.useContext(ArtistContext)
  const { name } = artist
  const hasMultipleUpgradableProfiles = upgradableProfiles.length > 1
  const planIsBasic = Object.values(profilesToUpgrade).some((plan) => plan === 'basic')

  const { currency, prorations: { amount = 0 } = {} } = prorationsPreview || {}
  const isDisabled = (! planIsBasic && ! amount) || Boolean(error)

  const {
    organizationArtists,
    organization,
    updateOrganizationArtists,
  } = useBillingStore(getBillingStoreState, shallow)
  const { id: organizationId } = organization

  const upgradePlan = React.useCallback(async () => {
    setIsLoading(true)
    const profilesWithPlan = formatProfilesToUpgrade(profilesToUpgrade)
    const { res: { profiles }, error } = await upgradeProfiles(organizationId, profilesWithPlan)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    const profileUpdated = profiles.find((profile) => profile.id === artistId)
    setStatus(profileUpdated.status)
    setPlan(profileUpdated.plan)

    // Update organization artists in billing store
    updateOrganizationArtists(profiles)

    setCurrentStep((currentStep) => currentStep + 1)
    setIsLoading(false)
  }, [organizationId, profilesToUpgrade, setStatus, setPlan, updateOrganizationArtists, setCurrentStep, artistId])

  React.useEffect(() => {
    const button = (
      <Button
        onClick={upgradePlan}
        className="w-full rounded-none"
        isDisabled={isDisabled}
        isLoading={isLoading}
        trackComponentName="PricingPlanUpgradePayment"
      >
        {(planIsBasic && amount === 0
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
  }, [upgradePlan, setSidePanelButton, amount, isDisabled, currency, isLoading, planIsBasic])

  React.useEffect(() => {
    // Get the current profile
    const currentProfile = organizationArtists.find((profile) => profile.id === artistId)

    // Filter out the current profile and any with an active pro plan
    const filteredProfiles = organizationArtists.filter((profile) => {
      const [planPrefix] = profile?.plan?.split('_') || []

      return profile.id !== artistId
        && ! (planPrefix === 'pro' && profile.status === 'active')
    })

    // Make sure that the currently active profile is the first item in the array
    setUpgradableProfiles([currentProfile, ...filteredProfiles])
  }, [artistId, organizationArtists, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profile{hasMultipleUpgradableProfiles ? 's' : ''}</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(hasMultipleUpgradableProfiles, name, profilesToUpgrade[artistId])} className="mb-8" />
      {hasMultipleUpgradableProfiles && (
        <PricingPlanUpgradePaymentProfilesList
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          profiles={upgradableProfiles}
          canChooseBasic={canChooseBasic}
        />
      )}
      <PricingProrationsLoader
        profilesToUpgrade={profilesToUpgrade}
        setProfilesToUpgrade={setProfilesToUpgrade}
        prorationsPreview={prorationsPreview}
        setProrationsPreview={setProrationsPreview}
        isAnnualPricing={isAnnualPricing}
      />
      <Error error={error} />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['basic', 'growth', 'pro', 'none'])),
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
