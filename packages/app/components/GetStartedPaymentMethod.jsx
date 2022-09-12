import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import AddPaymentForm from '@/app/AddPaymentForm'
import BillingPaymentCard from '@/app/BillingPaymentCard'
import GetStartedPaymentMethodPromoCode from '@/app/GetStartedPaymentMethodPromoCode'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Error from '@/elements/Error'

import { updateCompletedSetupAt } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'
import brandColors from '@/constants/brandColors'
import { pricingNumbers } from '@/constants/pricing'
import { formatCurrency } from '@/helpers/utils'

const getBillingStoreState = (state) => ({
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const GetStartedPaymentMethod = () => {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(null)

  const {
    artist: {
      hasSetUpProfile,
      hasGrowthPlan,
      hasProPlan,
      plan,
      currency: artistCurrency = 'GBP',
    },
    artistId,
    updatehasSetUpProfile,
  } = React.useContext(ArtistContext)

  const { user: { organizations } } = React.useContext(UserContext)
  const { next } = React.useContext(WizardContext)
  const organisationId = Object.values(organizations).find((organisation) => organisation.role === 'owner')?.id
  const { defaultPaymentMethod } = useBillingStore(getBillingStoreState)
  const isPaymentRequired = hasGrowthPlan || hasProPlan

  const [planPrefix, planPeriod] = plan.split('_')
  const monthlyCost = pricingNumbers[planPrefix].monthlyCost[artistCurrency]
  const annualCost = monthlyCost * 12
  const amountToPay = planPeriod === 'annual' ? annualCost - (annualCost * pricingNumbers.annualDiscount) : monthlyCost

  const {
    card,
    billing_details: billingDetails,
    is_default,
    currency = 'GBP',
  } = defaultPaymentMethod || {}

  const checkAndUpdateCompletedSetupAt = async () => {
    if (!hasSetUpProfile) {
      const { res: artistUpdated, error } = await updateCompletedSetupAt(artistId)

      if (error) {
        setError(error)
        return
      }

      const { completed_setup_at: completedSetupAt } = artistUpdated

      updatehasSetUpProfile(completedSetupAt)
    }
  }

  const savePaymentMethod = () => {
    if (defaultPaymentMethod) {
      next()
      return
    }
    addPaymentMethod()
  }

  // Go to next step on success
  useAsyncEffect(async () => {
    if (success) {
      await checkAndUpdateCompletedSetupAt()
      next()
    }
  }, [success, next])

  return (
    <div className="flex flex-1 flex-column mb-6">
      <MarkdownText className="w-full mb-8 xs:mb-10 font-medium" markdown={copy.paymentMethodSubtitle(planPrefix, planPeriod, formatCurrency(amountToPay, artistCurrency))} />
      <Error error={error} />
      <div className="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        {defaultPaymentMethod ? (
          <>
            <p className="mb-4 font-bold text-center">Your current default card:</p>
            <BillingPaymentCard
              currency={currency}
              card={card}
              billingDetails={billingDetails}
              isDefault={is_default}
              className="max-w-sm mb-10 mx-auto"
            />
          </>
        ) : (
          <>
            <AddPaymentForm
              organisationId={organisationId}
              setAddPaymentMethod={setAddPaymentMethod}
              setSuccess={setSuccess}
              shouldBeDefault
              shouldShowLabels={false}
              isFormValid={isFormValid}
              setIsFormValid={setIsFormValid}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPaymentRequired={isPaymentRequired}
            />
            <GetStartedPaymentMethodPromoCode />
          </>
        )}
        <Button
          version="green"
          onClick={savePaymentMethod}
          loading={isLoading}
          className="w-full sm:w-48 mt-12 mx-auto"
          trackComponentName="GetStartedPaymentMethod"
        >
          {isPaymentRequired ? `Pay ${formatCurrency(amountToPay, artistCurrency, true)}` : 'Next'}
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill={brandColors.white}
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedPaymentMethod.propTypes = {
}

GetStartedPaymentMethod.defaultProps = {
}

export default GetStartedPaymentMethod
