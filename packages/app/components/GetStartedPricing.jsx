import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedPricingPlansHeader from '@/app/GetStartedPricingPlansHeader'
import GetStartedPricingPlans from '@/app/GetStartedPricingPlans'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'
import { getPricingPlanString } from '@/app/helpers/billingHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedPricing = () => {
  const { artistId, setPlan, artist } = React.useContext(ArtistContext)
  const { currency: artistCurrency } = artist
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
  const { objective: storedObjective, plan: storedPricingPlan = '' } = wizardState || {}

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const objective = optimizationPreferences?.objective || storedObjective
  const recommendedPlan = objective === 'sales' ? 'pro' : 'growth'

  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(artist?.plan?.includes('annual') || storedPricingPlan?.includes('annual'))
  const [currency, setCurrency] = React.useState(artistCurrency || 'GBP')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)

  const handleNextStep = React.useCallback(async (pricingPlan) => {
    const pricingPlanString = getPricingPlanString(pricingPlan, showAnnualPricing)

    // If the pricing plan hasn't changed just go to the next step
    if (pricingPlanString === artist?.plan || pricingPlanString === wizardState?.plan) {
      next()
      return
    }

    // If there's no artist id available, store the data in local storage
    if (!artistId) {
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
    setPlan(updatedArtist.plan)

    setIsLoading(false)
    next()
  // eslint-disable-next-line
  }, [next, artistId, getPricingPlanString, showAnnualPricing])

  React.useEffect(() => {
    if (!selectedPricingPlan) return

    handleNextStep(selectedPricingPlan)
  }, [selectedPricingPlan, handleNextStep])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-xl mb-8 sm:mb-12">Select the features and pricing to suit you.</h3>
      <Error error={error} />
      {isLoading
        ? <Spinner />
        : (
          <>
            <GetStartedPricingPlansHeader
              currency={currency}
              setCurrency={setCurrency}
              showAnnualPricing={showAnnualPricing}
              setShowAnnualPricing={setShowAnnualPricing}
            />
            <GetStartedPricingPlans
              showAnnualPricing={showAnnualPricing}
              currency={currency}
              setSelectedPricingPlan={setSelectedPricingPlan}
              recommendedPlan={recommendedPlan}
            />
          </>
        )}
    </div>
  )
}

GetStartedPricing.propTypes = {
}

GetStartedPricing.defaultProps = {
}

export default GetStartedPricing
