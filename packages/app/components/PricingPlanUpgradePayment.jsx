import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePaymentProfilesList from '@/app/PricingPlanUpgradePaymentProfilesList'
import PricingPlanUpgradePaymentProrations from '@/app/PricingPlanUpgradePaymentProrations'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { formatCurrency } from '@/helpers/utils'
import { upgradePricingPlan } from '@/app/helpers/billingHelpers'
import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
  isLoadingProrations,
}) => {
  const [upgradableProfiles, setUpgradableProfiles] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId, artist } = React.useContext(ArtistContext)
  const { name, hasGrowthPlan } = artist
  const plan = profilesToUpgrade[artistId]
  const hasMultipleUpgradableProfiles = upgradableProfiles.length > 1

  const { currency, prorations: { amount = 0 } } = prorationsPreview || {}

  const { organisationArtists, organisation } = useBillingStore(getBillingStoreState, shallow)
  const { id: organisationId } = organisation

  const upgradePlan = React.useCallback(async () => {
    setIsLoading(true)
    const { error } = await upgradePricingPlan(organisationId, profilesToUpgrade)

    if (error) {
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep, profilesToUpgrade, organisationId])

  React.useEffect(() => {
    const button = (
      <Button
        version="insta"
        onClick={upgradePlan}
        trackComponentName="PricingPlanUpgradePayment"
        disabled={!amount}
        loading={isLoading}
      >
        Pay {formatCurrency(amount, currency)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={!amount ? brandColors.greyDark : brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [upgradePlan, setSidePanelButton, amount, currency, isLoading])

  React.useEffect(() => {
    // Get the current profile
    const currentProfile = organisationArtists.find((profile) => profile.id === artistId)

    // Filter out the current profile and profiles with a pro plan
    const otherProfiles = organisationArtists.filter((profile) => {
      const [planPrefix] = profile?.plan?.split('_') || []

      return (profile.id !== artistId) && (planPrefix !== 'pro')
    })

    // Make sure that the currently active profile is the first item in the array
    setUpgradableProfiles([currentProfile, ...otherProfiles])

    // Create plans object keyed by profile id
    const otherProfilesPlans = otherProfiles.reduce((result, { id, plan }) => {
      return {
        ...result,
        [id]: plan,
      }
    }, {})

    // Update the profiles to upgrade state
    setProfilesToUpgrade((profilesToUpgrade) => ({
      ...profilesToUpgrade,
      ...otherProfilesPlans,
    }))
  }, [artistId, organisationArtists, setProfilesToUpgrade])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profile{hasMultipleUpgradableProfiles ? 's' : ''}</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(hasMultipleUpgradableProfiles, name, plan, currency)} className="mb-8" />
      {(hasGrowthPlan && hasMultipleUpgradableProfiles) && (
        <PricingPlanUpgradePaymentProfilesList
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          profiles={upgradableProfiles}
        />
      )}
      <PricingPlanUpgradePaymentProrations
        prorationsPreview={prorationsPreview}
        profilesToUpgrade={profilesToUpgrade}
        isLoading={isLoadingProrations}
      />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.object,
  setProfilesToUpgrade: PropTypes.func,
  prorationsPreview: PropTypes.object,
  isLoadingProrations: PropTypes.bool,
}

PricingPlanUpgradePayment.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: null,
  setProfilesToUpgrade: () => {},
  prorationsPreview: null,
  isLoadingProrations: false,
}

export default PricingPlanUpgradePayment
