import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPeriodToggle from '@/PricingPeriodToggle'
import PricingCurrencySelect from '@/PricingCurrencySelect'
import PricingPlansWrapper from '@/PricingPlansWrapper'
import GetStartedPricingPlan from '@/app/GetStartedPricingPlan'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { pricingPlans } from '@/constants/pricing'

const GetStartedPricing = () => {
  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(false)
  const [currency, setCurrency] = React.useState('GBP')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  const getPricingPlanString = React.useCallback((pricingPlan) => {
    const period = showAnnualPricing ? 'anual' : 'monthly'

    return `${pricingPlan}_${period}`
  }, [showAnnualPricing])

  const handleNextStep = React.useCallback(async (pricingPlan) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const pricingPlanString = getPricingPlanString(pricingPlan)

    // If the pricing plan hasn't changed just go to the next step
    if (pricingPlanString === wizardState?.pricingPlan) {
      next()
      return
    }

    // If there's no artist id available, store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        pricingPlan: pricingPlanString,
      }))

      next()
      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updatePricingPlan(artistId, pricingPlanString)

    console.log(updatedArtist)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    next()
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
            <div className="flex items-center justify-between after:content-[''] after:flex-1 mb-10">
              <div className="flex flex-1">
                Currency:
                <PricingCurrencySelect
                  currency={currency}
                  setCurrency={setCurrency}
                  className="ml-2 w-[75px]"
                />
              </div>
              <PricingPeriodToggle
                showAnnualPricing={showAnnualPricing}
                setShowAnnualPricing={setShowAnnualPricing}
                className="flex items-center"
                buttonPillClassName="bg-blue border-blue"
              />
            </div>
            <div className="col-span-12">
              <PricingPlansWrapper
                plans={pricingPlans}
                showAnnualPricing={showAnnualPricing}
                currency={currency}
                pricingPlanComponent={GetStartedPricingPlan}
                setSelectedPricingPlan={setSelectedPricingPlan}
                recommendedPlan="growth"
              />
            </div>
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
