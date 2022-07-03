import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'
import ToggleSwitch from '@/elements/ToggleSwitch'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { updatePricingTier } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const GetStartedPricingTier = () => {
  const [selectedPricingTier, setSelectedPricingTier] = React.useState('')
  const [isMonthly, setIsMonthly] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  const getPricingTierString = React.useCallback((pricingTier) => {
    const period = isMonthly ? 'monthly' : 'annual'

    return `${pricingTier}_${period}`
  }, [isMonthly])

  const onChange = () => {
    setIsMonthly((isMonthly) => setIsMonthly(!isMonthly))
  }

  const handleNextStep = React.useCallback(async (pricingTier) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const pricingTierString = getPricingTierString(pricingTier)

    // If the pricing tier hasn't changed just go to the next step
    if (pricingTierString === wizardState?.pricingTier) {
      next()
      return
    }

    // If there's no artist id available, store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        pricingTier: pricingTierString,
      }))

      next()
      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updatePricingTier(artistId, pricingTierString)

    console.log(updatedArtist)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }


    setIsLoading(false)
    next()
  }, [next, artistId, getPricingTierString])

  React.useEffect(() => {
    if (!selectedPricingTier) return

    handleNextStep(selectedPricingTier)
  }, [selectedPricingTier, handleNextStep])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-xl">Select the features and pricing to suit you.</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown="And then there's a nice description about what these pricing tiers are and which one suits the user best." />
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
                    onClick={() => setSelectedPricingTier('basic')}
                  >
                    Basic
                  </button>
                  <button
                    className="h-60 w-1/3 mx-2 border-3 border-solid border-black rounded-dialogue font-bold"
                    onClick={() => setSelectedPricingTier('growth')}
                  >
                    Growth
                  </button>
                  <button
                    className="h-60 w-1/3 mx-2 border-3 border-solid border-black rounded-dialogue font-bold"
                    onClick={() => setSelectedPricingTier('pro')}
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

GetStartedPricingTier.propTypes = {
}

GetStartedPricingTier.defaultProps = {
}

export default GetStartedPricingTier
