import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'
import useBillingStore from '@/app/stores/billingStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedPricingPlansHeader from '@/app/GetStartedPricingPlansHeader'
import GetStartedPricingPlans from '@/app/GetStartedPricingPlans'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'
import { getPricingPlanString } from '@/app/helpers/billingHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

const GetStartedPricing = () => {
  const { artistId, setPlan, artist } = React.useContext(ArtistContext)
  const { currency: artistCurrency } = artist
  const wizardState = ! artistId ? (JSON.parse(getLocalStorage('getStartedWizard')) || {}) : {}
  const { objective: storedObjective } = wizardState || {}

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const objective = optimizationPreferences?.objective || storedObjective
  const recommendedPlan = objective === 'sales' ? 'pro' : 'growth'

  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [currency, setCurrency] = React.useState(artistCurrency || 'GBP')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasMultipleProfiles = organizationArtists.length > 1

  const { next } = React.useContext(WizardContext)

  const handleNextStep = React.useCallback(async (pricingPlan) => {
    const pricingPlanString = getPricingPlanString(pricingPlan)

    // If the pricing plan hasn't changed just go to the next step
    if (pricingPlanString === artist?.plan || pricingPlanString === wizardState?.plan) {
      next()
      return
    }

    // If there's no artist id available, store the data in local storage
    if (! artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        plan: pricingPlanString,
      }))

      next()
      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updatePricingPlan(artistId, pricingPlanString)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    // Update artist context
    setPlan(updatedArtist)

    setIsLoading(false)
    next()
  // eslint-disable-next-line
  }, [next, artistId, getPricingPlanString])

  React.useEffect(() => {
    if (! selectedPricingPlan) return

    handleNextStep(selectedPricingPlan)
  }, [selectedPricingPlan, handleNextStep])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-lg mb-8 sm:mb-12">{copy.pricingSubtitle}</h3>
      <Error error={error} />
      {isLoading
        ? <Spinner />
        : (
          <>
            {! hasMultipleProfiles && (
              <GetStartedPricingPlansHeader
                currency={currency}
                setCurrency={setCurrency}
              />
            )}
            <GetStartedPricingPlans
              artistId={artistId}
              currency={currency}
              setSelectedPricingPlan={setSelectedPricingPlan}
              recommendedPlan={recommendedPlan}
              objective={objective}
            />
          </>
        )}
    </div>
  )
}

export default GetStartedPricing
