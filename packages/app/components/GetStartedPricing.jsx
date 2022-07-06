import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedPricingPlansHeader from '@/app/GetStartedPricingPlansHeader'
import GetStartedPricingPlans from '@/app/GetStartedPricingPlans'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedPricing = () => {
  const { artistId, setPlan, artist: { plan } } = React.useContext(ArtistContext)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
  const { objective: storedObjective, plan: storedPricingPlan = '' } = wizardState || {}

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const objective = optimizationPreferences?.objective || storedObjective
  const recommendedPlan = objective === 'sales' ? 'pro' : 'growth'

  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(plan.includes('annual') || storedPricingPlan?.includes('annual'))
  const [currency, setCurrency] = React.useState('GBP')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)

  const getPricingPlanString = React.useCallback((pricingPlan) => {
    const period = showAnnualPricing && pricingPlan !== 'basic' ? 'annual' : 'monthly'

    return `${pricingPlan}_${period}`
  }, [showAnnualPricing])

  const handleNextStep = React.useCallback(async (pricingPlan) => {
    const pricingPlanString = getPricingPlanString(pricingPlan)

    // If the pricing plan hasn't changed just go to the next step
    if (pricingPlanString === plan || pricingPlanString === wizardState?.plan) {
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
  }, [next, artistId, getPricingPlanString])

  React.useEffect(() => {
    if (!selectedPricingPlan) return

    handleNextStep(selectedPricingPlan)
  }, [selectedPricingPlan, handleNextStep])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-xl">Select the features and pricing to suit you.</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic mb-12" markdown="And then there's a nice description about what these pricing plans are and which one suits the user best." />
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
