import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import useControlsStore from '@/app/stores/controlsStore'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { updateObjective } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const objectives = [
  {
    title: 'Audience growth',
    value: 'growth',
    color: 'green',
  },
  {
    title: 'Website sales',
    value: 'sales',
    color: 'pink',

  },
  {
    title: 'Website visits',
    value: 'traffic',
    color: 'blue',
  },
]

const GetStartedObjective = () => {
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { updatePreferences } = useControlsStore(getControlsStoreState)
  const { artistId } = React.useContext(ArtistContext)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const handleNextStep = async (objective) => {
    const nextStep = objective === 'growth' ? 1 : 2

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, objective }))
      goToStep(nextStep)
    }

    // Otherwise save the data in the db
    const { res: artist, error } = await updateObjective(artistId, objective)

    if (error) {
      setError({ message: error.message })
      return
    }

    // Update global store value
    updatePreferences({
      optimizationPreferences: {
        objective: artist.preferences.optimization.objective,
      },
    })

    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="w-full mb-8 xs:mb-0 font-medium text-xl">What are you trying to achieve?</h3>
      <div className="flex flex-1 flex-column justify-center">
        <Error error={error} />
        <div className="xs:flex justify-between xs:-mx-4 mb-10 xs:mb-20">
          {objectives.map(({ title, value, color }) => (
            <Button
              key={value}
              version={color}
              onClick={() => handleNextStep(value)}
              className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
              trackComponentName="GetStartedObjectiveStep"
            >
              {title}
              <ArrowAltIcon
                className="ml-3"
                direction="right"
                fill="white"
              />
            </Button>
          ))}
        </div>
        <a className="w-full xs:text-center" href="mailto:help@tryfeed.co">Something else?</a>
      </div>
    </div>
  )
}

GetStartedObjective.propTypes = {
}

GetStartedObjective.defaultProps = {
}

export default GetStartedObjective
