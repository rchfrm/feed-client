import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedObjectiveButton from '@/app/GetStartedObjectiveButton'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useControlsStore from '@/app/stores/controlsStore'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { objectives, updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedObjective = () => {
  const [selectedObjective, setSelectedObjective] = React.useState('')
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { updatePreferences, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective: currentObjective } = optimizationPreferences
  const { artistId, artist, setPostPreferences } = React.useContext(ArtistContext)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const unsetDefaultLink = (artist) => {
    // Unset the link in the controls store
    updateLinks('chooseNewDefaultLink', { newArtist: artist, newLink: null })

    // Update the posts and conversions preferences objects
    updatePreferences({
      postsPreferences: {
        defaultLinkId: null,
      },
      conversionsPreferences: {
        defaultLinkId: null,
      },
    })

    // Update artist context
    setPostPreferences('default_link_id', null)
  }

  const handleNextStep = async (objective) => {
    const isGrowth = objective === 'growth'
    const nextStep = isGrowth ? 1 : 2

    // If the objective hasn't changed just go to the next step
    if (objective === currentObjective) {
      goToStep(nextStep)
      return
    }

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        objective,
        ...(!isGrowth && { platform: 'website' }),
        defaultLink: null,
      }))

      updatePreferences({
        optimizationPreferences: {
          objective,
          ...(!isGrowth && { platform: 'website' }),
        },
        postsPreferences: {
          defaultLinkId: null,
        },
      })
      goToStep(nextStep)

      return
    }

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      ...(!isGrowth && { platform: 'website' }),
      defaultLinkId: null,
    })

    if (error) {
      setError(error)
      return
    }

    // Unset the default link
    unsetDefaultLink(updatedArtist)

    // Update preferences in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    goToStep(nextStep)
  }

  React.useEffect(() => {
    if (!selectedObjective) return

    handleNextStep(selectedObjective)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObjective])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-xl">{copy.objectiveSubtitle}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.objectiveDescription} />
      <div className="flex flex-1 flex-column justify-center">
        <Error error={error} />
        <div className="xs:flex justify-between xs:-mx-4 mb-10 xs:mb-20">
          {objectives.map((objective) => (
            <GetStartedObjectiveButton
              key={objective.value}
              objective={objective}
              setSelectedObjective={setSelectedObjective}
            />
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
