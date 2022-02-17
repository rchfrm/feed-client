import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'

import useControlsStore from '@/app/stores/controlsStore'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { updateArtist } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

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
    const isGrowth = objective === 'growth'
    const nextStep = isGrowth ? 1 : 2

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, objective }))
      goToStep(nextStep)

      return
    }

    // Otherwise save the data in the db
    const { res: artist, error } = await updateArtist(artistId, {
      objective,
      ...(!isGrowth && { platform: 'website' }),
    })

    if (error) {
      setError(error)
      return
    }

    // Update preferences in controls store
    updatePreferences({
      postsPreferences: {
        callToAction: artist.preferences.posts.call_to_action,
      },
      optimizationPreferences: {
        objective: artist.preferences.optimization.objective,
        platform: artist.preferences.optimization.platform,
      },
      conversionsPreferences: {
        ...(objective === 'sales' && { callToAction: artist.preferences.conversions.call_to_action }),
        ...((objective === 'sales' || objective === 'traffic') && { facebookPixelEvent: artist.preferences.conversions.facebook_pixel_event }),
      },
    })

    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-xl">{copy.objectiveSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.objectiveDescription} />
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
        <a className="xs:self-center" href="mailto:help@tryfeed.co">Something else?</a>
      </div>
    </div>
  )
}

GetStartedObjective.propTypes = {
}

GetStartedObjective.defaultProps = {
}

export default GetStartedObjective