import React from 'react'
import useAsyncEffect from 'use-async-effect'
import useBillingStore from '@/app/stores/billingStore'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'
import { WizardContext } from '@/app/contexts/WizardContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import AddPaymentForm from '@/app/AddPaymentForm'
import BillingPaymentCard from '@/app/BillingPaymentCard'
import GetStartedPaymentMethodPromoCode from '@/app/GetStartedPaymentMethodPromoCode'
import GetStartedPaymentMethodProrationsButton from '@/app/GetStartedPaymentMethodProrationsButton'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowIcon from '@/icons/ArrowIcon'
import Error from '@/elements/Error'
import { updateCompletedSetupAt } from '@/app/helpers/artistHelpers'
import { getProrationsPreview, upgradeProfiles } from '@/app/helpers/billingHelpers'
import copy from '@/app/copy/getStartedCopy'
import { formatCurrency } from '@/helpers/utils'

const getBillingStoreState = (state) => ({
  billingDetails: state.billingDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
  addPaymentMethodToStore: state.addPaymentMethod,
  organizationArtists: state.organizationArtists,
  updateOrganizationArtists: state.updateOrganizationArtists,
})

const GetStartedPaymentMethod = () => {
  const {
    defaultPaymentMethod,
    addPaymentMethodToStore,
    organizationArtists,
    updateOrganizationArtists,
  } = useBillingStore(getBillingStoreState)
  const { next, setWizardState, wizardState } = React.useContext(WizardContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ targetingState, saveTargetingSettings })

  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [shouldShowPaymentMethodForm, setShouldShowPaymentMethodForm] = React.useState(Boolean(! defaultPaymentMethod))
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingAmountToPay, setIsLoadingAmountToPay] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [amountToPay, setAmountToPay] = React.useState(0)
  const [promoCode, setPromoCode] = React.useState(wizardState?.promoCode || '')
  const [promoCodeError, setPromoCodeError] = React.useState(null)
  const [isValidPromoCode, setIsValidPromoCode] = React.useState(false)
  const [hasAppliedPromoCode, setHasAppliedPromoCode] = React.useState(false)

  const {
    artist,
    setStatus,
    setPlan,
    artistId,
    updateArtist,
  } = React.useContext(ArtistContext)

  const {
    hasSetUpProfile,
    plan,
    currency: artistCurrency = 'GBP',
    is_managed: isManaged,
    status,
  } = artist

  const { user: { organizations } } = React.useContext(UserContext)
  const organizationId = Object.values(organizations).find((org) => org.role === 'owner')?.id

  const [planPrefix, planPeriod] = plan.split('_')

  const isPaymentRequired = status !== 'active' && planPrefix !== 'free'
  const profilePlans = React.useMemo(() => ({ [artistId]: plan }), [artistId, plan])
  const shouldShowPromoCodeInput = false

  const {
    card,
    billing_details: billingDetails,
    is_default,
    currency = 'GBP',
  } = defaultPaymentMethod || {}

  // Get amount to pay on mount or when a valid promo code is provided
  useAsyncEffect(async () => {
    if (! isPaymentRequired || (promoCode && ! isValidPromoCode) || isManaged || ! plan) {
      return
    }

    setIsLoadingAmountToPay(true)

    const { res, error } = await getProrationsPreview(organizationId, profilePlans, promoCode)

    if (error) {
      if (error.message === 'Invalid promo code') {
        setIsValidPromoCode(false)
        setPromoCodeError(error)
        setIsLoadingAmountToPay(false)
        return
      }

      setError(error)
      setIsLoadingAmountToPay(false)
      return
    }

    if (promoCode) {
      setHasAppliedPromoCode(true)

      // Store applied promo code in the wizard state
      setWizardState({
        type: 'set-state',
        payload: {
          key: 'promoCode',
          value: promoCode,
        },
      })
    }

    setAmountToPay(res.prorations.amount)
    setIsLoadingAmountToPay(false)
  }, [isValidPromoCode])

  const checkAndUpdateCompletedSetupAt = async () => {
    if (! hasSetUpProfile) {
      const { res: artistUpdated, error } = await updateCompletedSetupAt(artistId)

      if (error) {
        setError(error)
        return
      }

      updateArtist(artistUpdated)
      await saveTargeting('', { ...targetingState, status: 1 })
    }
  }

  const upgradeProfilePlans = async () => {
    const { res: { clientSecret, profiles } = {}, error } = await upgradeProfiles(organizationId, profilePlans, promoCode)
    if (error) {
      return { error }
    }

    const profileUpdated = profiles.find((profile) => profile.id === artistId)
    setStatus(profileUpdated.status)
    setPlan(profileUpdated)
    updateOrganizationArtists(profiles)
    setIsLoading(false)

    return { profileUpdated, clientSecret }
  }

  const setStatusToActive = () => {
    setStatus('active')
    setPlan(artist)

    const upgradedProfilesWithActiveStatus = organizationArtists.map((profile) => {
      if (['incomplete', 'past_due'].includes(profile.status)) {
        profile.status = 'active'
      }
      return profile
    })
    updateOrganizationArtists(upgradedProfilesWithActiveStatus)
  }

  const handleNext = async () => {
    setIsLoading(true)

    const { profileUpdated, clientSecret, error } = await upgradeProfilePlans()

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (profileUpdated.plan === 'active' || ! clientSecret) {
      setSuccess(true)
      return
    }

    addPaymentMethod(clientSecret)
  }

  // Go to next step on success
  useAsyncEffect(async () => {
    if (success) {
      setShouldShowPaymentMethodForm(false)
      await checkAndUpdateCompletedSetupAt()
      setStatusToActive()

      next()
    }
  }, [success, next])

  return (
    <div className="flex flex-1 flex-column mb-6">
      <MarkdownText className="w-full mb-8 xs:mb-10 font-medium" markdown={copy.paymentMethodSubtitle(defaultPaymentMethod, planPrefix, planPeriod, formatCurrency(amountToPay, artistCurrency), isManaged)} />
      <Error error={error} />
      <div className="w-full sm:w-1/2 lg:w-1/3 mx-auto text-center">
        {! isManaged && (
          <>
            {shouldShowPaymentMethodForm ? (
              <AddPaymentForm
                addMethodToState={addPaymentMethodToStore}
                organizationId={organizationId}
                setAddPaymentMethod={setAddPaymentMethod}
                setSuccess={setSuccess}
                shouldBeDefault
                shouldShowLabels={false}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                promoCode={promoCode}
                isPaymentRequired={isPaymentRequired}
                profilePlans={profilePlans}
              />
            ) : (
              <>
                <p className="mb-4 font-bold text-center">Your default card:</p>
                <BillingPaymentCard
                  currency={currency}
                  card={card}
                  billingDetails={billingDetails}
                  isDefault={is_default}
                  className="max-w-sm mb-6 mx-auto"
                />
              </>
            )}
          </>
        )}
        {isPaymentRequired && (
          <>
            {shouldShowPromoCodeInput && (
              <GetStartedPaymentMethodPromoCode
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                setIsValidPromoCode={setIsValidPromoCode}
                hasAppliedPromoCode={hasAppliedPromoCode}
                setHasAppliedPromoCode={setHasAppliedPromoCode}
                isLoading={isLoadingAmountToPay}
                error={promoCodeError}
                setError={setPromoCodeError}
              />
            )}
            <GetStartedPaymentMethodProrationsButton promoCode={promoCode} />
          </>
        )}
        <Button
          onClick={handleNext}
          isLoading={isLoading || isLoadingAmountToPay}
          className="w-full sm:w-48 mt-12 mx-auto"
          trackComponentName="GetStartedPaymentMethod"
        >
          {isPaymentRequired ? `Pay ${formatCurrency(amountToPay, artistCurrency)}` : 'Next'}
          <ArrowIcon
            className="w-7 h-auto ml-1"
            direction="right"
          />
        </Button>
      </div>
    </div>
  )
}

export default GetStartedPaymentMethod
