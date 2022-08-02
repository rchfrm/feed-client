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
import { upgradePricingPlan } from '@/app/helpers/billingHelpers'
import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationArtists: state.organisationArtists,
  updateOrganisationArtists: state.updateOrganisationArtists,
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

  const { artistId, artist, setPlan } = React.useContext(ArtistContext)
  const { name, hasGrowthPlan } = artist
  const hasMultipleUpgradableProfiles = upgradableProfiles.length > 1

  const { currency, prorations: { amount = 0 } = {} } = prorationsPreview || {}
  const isDisabled = !amount || Boolean(error)

  const {
    organisationArtists,
    organisation,
    updateOrganisationArtists,
  } = useBillingStore(getBillingStoreState, shallow)
  const { id: organisationId } = organisation

  const upgradePlan = React.useCallback(async () => {
    setIsLoading(true)
    const { res: { profiles }, error } = await upgradePricingPlan(organisationId, profilesToUpgrade)

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    // Update plan in artist context
    setPlan(plan)

    // Update organisation artists in billing store
    updateOrganisationArtists(profiles)

    setCurrentStep((currentStep) => currentStep + 1)
    setIsLoading(false)
  }, [setCurrentStep, profilesToUpgrade, organisationId, plan, setPlan, updateOrganisationArtists, setError])

  React.useEffect(() => {
    const button = (
      <Button
        version="insta"
        onClick={upgradePlan}
        trackComponentName="PricingPlanUpgradePayment"
        disabled={isDisabled}
        loading={isLoading}
      >
        Pay {formatCurrency(amount, currency)}
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
    const currentProfile = organisationArtists.find((profile) => profile.id === artistId)

    // Filter out the current profile
    const otherProfiles = organisationArtists.filter((profile) => profile.id !== artistId)

    // Filter out profiles with a pro plan
    const filteredProfiles = otherProfiles.filter((profile) => {
      const [planPrefix] = profile?.plan?.split('_') || []

      return planPrefix !== 'pro'
    })

    // Make sure that the currently active profile is the first item in the array
    setUpgradableProfiles([currentProfile, ...filteredProfiles])
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
