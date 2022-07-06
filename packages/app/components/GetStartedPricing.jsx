import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPeriodToggle from '@/PricingPeriodToggle'
import PricingCurrencySelect from '@/PricingCurrencySelect'
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

  const { setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)
  const { next } = React.useContext(WizardContext)

  const getPricingPlanString = React.useCallback((pricingPlan) => {
    const period = showAnnualPricing && pricingPlan !== 'basic' ? 'annual' : 'monthly'

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
            <div
              className={[
                'flex flex-column xs:flex-row sm:items-center xs:justify-between',
                "after:content-[''] after:flex-1",
                'mb-5',
              ].join(' ')}
            >
              <div className="flex flex-1 mb-2 xs:mb-0">
                <PricingCurrencySelect
                  currency={currency}
                  setCurrency={setCurrency}
                  className="xs:ml-2 w-[75px]"
                />
              </div>
              <PricingPeriodToggle
                showAnnualPricing={showAnnualPricing}
                setShowAnnualPricing={setShowAnnualPricing}
                className="flex items-center"
                buttonPillClassName="bg-blue border-blue"
              />
            </div>
            <div className="col-span-12 sm:mt-12 mb-10">
              <div className="grid grid-cols-12 gap-4">
                {pricingPlans.map(plan => {
                  return (
                    <div
                      key={plan.name}
                      className="col-span-12 sm:col-span-4"
                    >
                      <GetStartedPricingPlan
                        plan={plan}
                        showAnnualPricing={showAnnualPricing}
                        currency={currency}
                        setSelectedPricingPlan={setSelectedPricingPlan}
                        handleSidePanel={openReadMoreSidePanel}
                        isRecommended={plan.name === recommendedPlan}
                      />
                    </div>
                  )
                })}
              </div>
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
