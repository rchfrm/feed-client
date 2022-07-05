import React from 'react'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlansHeader from '@/PricingPlansHeader'
import PricingPlansWrapper from '@/PricingPlansWrapper'
import GetStartedPricingPlan from '@/app/GetStartedPricingPlan'
import GetStartedPricingReadMore from '@/app/GetStartedPricingReadMore'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Button from '@/elements/Button'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { pricingPlans } from '@/constants/pricing'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedPricing = () => {
  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(false)
  const [currency, setCurrency] = React.useState('GBP')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)
  const isDesktop = useBreakpointTest('sm')

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
  const { objective: storedObjective } = wizardState || {}
  const objective = optimizationPreferences?.objective || storedObjective
  const recommendedPlan = objective === 'sales' ? 'pro' : 'growth'

  const getPricingPlanString = React.useCallback((pricingPlan) => {
    const period = showAnnualPricing ? 'anual' : 'monthly'

    return `${pricingPlan}_${period}`
  }, [showAnnualPricing])

  const openReadMoreSidePanel = (plan) => {
    const content = <GetStartedPricingReadMore plan={plan} currency={currency} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>

    setSidePanelContent(content)
    toggleSidePanel(true)
    setSidePanelButton(button)
  }

  const handleNextStep = React.useCallback(async (pricingPlan) => {
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
            <PricingPlansHeader
              currency={currency}
              setCurrency={setCurrency}
              showAnnualPricing={showAnnualPricing}
              setShowAnnualPricing={setShowAnnualPricing}
              buttonPillClassName="bg-blue border-blue"
            />
            <div className="col-span-12 mb-10">
              <PricingPlansWrapper
                plans={pricingPlans}
                showAnnualPricing={showAnnualPricing}
                currency={currency}
                pricingPlanComponent={GetStartedPricingPlan}
                isDesktop={isDesktop}
                setSelectedPricingPlan={setSelectedPricingPlan}
                handleSidePanel={openReadMoreSidePanel}
                recommendedPlan={recommendedPlan}
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
