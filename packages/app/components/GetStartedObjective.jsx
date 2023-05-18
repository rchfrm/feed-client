import React from 'react'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import useControlsStore from '@/app/stores/controlsStore'
import ObjectiveButton from '@/app/ObjectiveButton'
import ObjectiveContactFooter from '@/app/ObjectiveContactFooter'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import { updateArtist, getPreferencesObject, optimizations } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import copy from '@/app/copy/getStartedCopy'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
})

const GetStartedObjective = () => {
  const [optimization, setOptimization] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { goToStep } = React.useContext(WizardContext)
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const {
    updatePreferences,
    optimizationPreferences,
    nestedLinks,
    updateLinks,
  } = useControlsStore(getControlsStoreState)
  const wizardState = ! artistId ? (JSON.parse(getLocalStorage('getStartedWizard')) || {}) : {}
  const currentObjective = optimizationPreferences?.objective || wizardState?.objective
  const currentPlatform = optimizationPreferences?.platform || wizardState?.platform

  const unsetDefaultLink = (artist) => {
    // Unset the link in the controls store
    updateLinks('chooseNewDefaultLink', { newArtist: artist, newLink: null })

    // Update the posts and conversions preferences objects
    updatePreferences({
      postsPreferences: {
        defaultLinkId: null,
      },
    })

    // Update artist context
    setPostPreferences('default_link_id', null)
  }

  const handleNextStep = async (optimization) => {
    const isInstagram = optimization.platform === 'instagram'
    const nextStep = isInstagram ? 2 : 1

    // If the platform and objective hasn't changed just go to the next step
    if (optimization.platform === currentPlatform && optimization.objective === currentObjective) {
      goToStep(nextStep)
      return
    }

    if (! artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        objective: optimization.objective,
        platform: optimization.platform,
        defaultLink: isInstagram ? { href: optimization.platform } : null,
      }))

      updatePreferences({
        optimizationPreferences: {
          objective: optimization.objective,
          platform: optimization.platform,
        },
      })

      goToStep(nextStep)
      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective: optimization.objective,
      platform: optimization.platform,
      defaultLink: isInstagram ? getLinkByPlatform(nestedLinks, optimization.platform).id : null,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (isInstagram) {
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist })
    } else {
      // Unset the default link
      unsetDefaultLink(updatedArtist)
    }

    // Update preferences in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    saveTargetingSettings({
      ...targetingState,
      platforms: isInstagram ? [optimization.platform] : [],
    })

    setIsLoading(false)
    goToStep(nextStep)
  }

  React.useEffect(() => {
    if (! optimization) return

    handleNextStep(optimization)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optimization])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="font-medium text-lg">{copy.objectiveSubtitle}</h3>
      <Error error={error} />
      <div>
        <div className="w-full xxs:w-3/4 lg:w-1/2 mx-auto mt-12">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex flex-col xs:flex-row xs:justify-center mb-5 gap-y-4 xs:gap-x-8 xs:flex-wrap">
                {optimizations.reduce((acc, opt) => {
                  const hasConversationsAccess = Boolean(artist.feature_flags?.conversations_objective_enabled)
                  if (opt.objective === 'conversations' && ! hasConversationsAccess) return acc

                  const key = `${opt.platform}_${opt.objective}`
                  const button = (
                    <ObjectiveButton
                      key={key}
                      optimization={opt}
                      setOptimization={setOptimization}
                    />
                  )
                  acc.push(button)
                  return acc
                }, [])}
              </div>
              <ObjectiveContactFooter
                className="justify-center"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetStartedObjective
