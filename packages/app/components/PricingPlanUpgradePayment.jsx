import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePaymentProfilesList from '@/app/PricingPlanUpgradePaymentProfilesList'
import PricingProrationsLoader from '@/app/PricingProrationsLoader'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Error from '@/elements/Error'

import brandColors from '@/constants/brandColors'

import { formatCurrency } from '@/helpers/utils'
import { upgradeProfiles } from '@/app/helpers/billingHelpers'
import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationArtists: state.organizationArtists,
  updateOrganizationArtists: state.updateOrganizationArtists,
})

const PricingPlanUpgradePayment = ({
  plan,
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
  setProrationsPreview,
}) => {
  const [upgradableProfiles, setUpgradableProfiles] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, artist, setPlan, setStatus } = React.useContext(ArtistContext)
  const { name, hasGrowthPlan } = artist
  const hasMultipleUpgradableProfiles = upgradableProfiles.length > 1
  const planIsBasic = plan === 'basic_monthly'

  const { currency, prorations: { amount = 0 } = {} } = prorationsPreview || {}
  const isDisabled = (!planIsBasic && !amount) || Boolean(error)

  const {
    organizationArtists,
    organization,
    updateOrganizationArtists,
  } = useBillingStore(getBillingStoreState, shallow)
  const { id: organizationId } = organization

  const upgradePlan = React.useCallback(async () => {
    setIsLoading(true)
    const { res: { profiles }, error } = await upgradeProfiles(organizationId, profilesToUpgrade)

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    const profileUpdated = profiles.find(profile => profile.id === artistId)
    setStatus(profileUpdated.status)
    setPlan(profileUpdated.plan)

    // Update organization artists in billing store
    updateOrganizationArtists(profiles)

    setCurrentStep((currentStep) => currentStep + 1)
    setIsLoading(false)
  }, [setCurrentStep, profilesToUpgrade, organizationId, updateOrganizationArtists, setError, artistId, setPlan, setStatus])

  React.useEffect(() => {
    const button = (
      <Button
        version="insta"
        onClick={upgradePlan}
        trackComponentName="PricingPlanUpgradePayment"
        disabled={isDisabled}
        loading={isLoading}
      >
        {(planIsBasic && amount === 0
          ? `Confirm (${formatCurrency(amount, currency, true)})`
          : `Pay ${formatCurrency(amount, currency)}`
        )}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={isDisabled ? brandColors.greyDark : brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [upgradePlan, setSidePanelButton, amount, isDisabled, currency, isLoading])

  React.useEffect(() => {
    // Get the current profile
    const currentProfile = organizationArtists.find((profile) => profile.id === artistId)

    // Filter out the current profile
    const otherProfiles = organizationArtists.filter((profile) => profile.id !== artistId)

    // Filter out profiles with no plan or a pro plan
    const filteredProfiles = otherProfiles.filter((profile) => {
      const [planPrefix] = profile?.plan?.split('_') || []

      return planPrefix && planPrefix !== 'pro'
    })

    // Make sure that the currently active profile is the first item in the array
    setUpgradableProfiles([currentProfile, ...filteredProfiles])
  }, [artistId, organizationArtists, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profile{hasMultipleUpgradableProfiles ? 's' : ''}</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro({ hasMultipleUpgradableProfiles, hasGrowthPlan, name, plan, currency })} className="mb-8" />
      {(hasGrowthPlan && hasMultipleUpgradableProfiles) && (
        <PricingPlanUpgradePaymentProfilesList
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          profiles={upgradableProfiles}
        />
      )}
      <PricingProrationsLoader
        profilesToUpgrade={profilesToUpgrade}
        setProfilesToUpgrade={setProfilesToUpgrade}
        prorationsPreview={prorationsPreview}
        setProrationsPreview={setProrationsPreview}
        plan={plan}
      />
      <Error error={error} />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  plan: PropTypes.string,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.object,
  setProfilesToUpgrade: PropTypes.func,
  prorationsPreview: PropTypes.object,
  setProrationsPreview: PropTypes.func,
}

PricingPlanUpgradePayment.defaultProps = {
  plan: '',
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: null,
  setProfilesToUpgrade: () => {},
  prorationsPreview: null,
  setProrationsPreview: () => {},
}

export default PricingPlanUpgradePayment
