import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'
import ToggleSwitch from '@/elements/ToggleSwitch'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { updatePricingPlan } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const GetStartedPricingPlan = () => {
  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState('')
  const [isMonthly, setIsMonthly] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  const getPricingPlanString = React.useCallback((pricingPlan) => {
    const period = isMonthly ? 'monthly' : 'annual'

    return `${pricingPlan}_${period}`
  }, [isMonthly])

  const onChange = () => {
    setIsMonthly((isMonthly) => setIsMonthly(!isMonthly))
  }

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
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown="And then there's a nice description about what these pricing plans are and which one suits the user best." />
      <Error error={error} />
      <div>
        <div>
          {isLoading
            ? <Spinner />
            : (
              <>
                <ToggleSwitch
                  state={isMonthly}
                  onChange={onChange}
                  className="block mx-auto"
                />
                <div className="w-full flex mx-auto mt-6">
                  <button
                    className="h-60 w-1/3 mx-2 border-3 border-solid border-black rounded-dialogue font-bold"
                    onClick={() => setSelectedPricingPlan('basic')}
                  >
                    Basic
                  </button>
                  <button
                    className="h-60 w-1/3 mx-2 border-3 border-solid border-black rounded-dialogue font-bold"
                    onClick={() => setSelectedPricingPlan('growth')}
                  >
                    Growth
                  </button>
                  <button
                    className="h-60 w-1/3 mx-2 border-3 border-solid border-black rounded-dialogue font-bold"
                    onClick={() => setSelectedPricingPlan('pro')}
                  >
                    Pro
                  </button>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  )
}

GetStartedPricingPlan.propTypes = {
}

GetStartedPricingPlan.defaultProps = {
}

export default GetStartedPricingPlan
