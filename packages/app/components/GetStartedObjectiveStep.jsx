import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import useControlsStore from '@/app/stores/controlsStore'

import { updateObjective } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const GetStartedObjectiveStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { updatePreferences } = useControlsStore(getControlsStoreState)
  const { artistId } = React.useContext(ArtistContext)

  const handleNextStep = async (objective) => {
    setIsLoading(true)

    const { res: artist, error } = await updateObjective(artistId, objective)

    if (error) {
      setError({ message: error.message })
      setIsLoading(false)
      return
    }

    // Update global store value
    updatePreferences(
      'optimizationPreferences',
      { objective: artist.preferences.optimization.objective },
    )

    const nextStep = objective === 'growth' ? 1 : 3

    setIsLoading(false)
    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column justify-center">
      <Error error={error} />
      <div className="xs:flex justify-between xs:-mx-4 mb-10 xs:mb-20">
        <Button
          version="green"
          onClick={() => handleNextStep('growth')}
          loading={isLoading}
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
          trackComponentName="GetStartedObjectiveStep"
        >
          Audience growth
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
        <Button
          version="pink"
          onClick={() => handleNextStep('sales')}
          loading={isLoading}
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
          trackComponentName="GetStartedObjectiveStep"
        >
          Website sales
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
        <Button
          version="blue"
          onClick={() => handleNextStep('traffic')}
          loading={isLoading}
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
          trackComponentName="GetStartedObjectiveStep"
        >
          Website visits
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
      <p className="w-full xs:text-center underline">Something else?</p>
    </div>
  )
}

GetStartedObjectiveStep.propTypes = {
}

GetStartedObjectiveStep.defaultProps = {
}

export default GetStartedObjectiveStep
