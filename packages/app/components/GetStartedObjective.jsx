import React from 'react'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import useControlsStore from '@/app/stores/controlsStore'
import ObjectiveButton from '@/app/ObjectiveButton'
import ObjectiveContactFooter from '@/app/ObjectiveContactFooter'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import { updateArtist, platforms, getPreferencesObject } from '@/app/helpers/artistHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
})

const GetStartedObjective = () => {
  const [platform, setPlatform] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const objective = 'growth'
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const { goToStep } = React.useContext(WizardContext)
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const {
    updatePreferences,
    optimizationPreferences,
    nestedLinks,
    updateLinks,
  } = useControlsStore(getControlsStoreState)
  const { platform: currentPlatform } = optimizationPreferences

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

    // Update local storage default link value
    setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, defaultLink: null }))
  }

  const handleNextStep = async (platform) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const isInstagram = platform === 'instagram'
    const nextStep = isInstagram ? 2 : 1

    // If the platform hasn't changed just go to the next step
    if (platform === currentPlatform || platform === wizardState?.platform) {
      goToStep(nextStep)
      return
    }

    // If there's no connected account yet store the data in local storage
    if (! artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        objective,
        platform,
        defaultLink: isInstagram ? { href: platform } : null,
      }))

      updatePreferences({
        optimizationPreferences: {
          objective,
          platform,
        },
      })
      goToStep(nextStep)

      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      defaultLink: isInstagram ? getLinkByPlatform(nestedLinks, platform).id : null,
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
      platforms: isInstagram ? [platform] : [],
    })

    setIsLoading(false)
    goToStep(nextStep)
  }

  React.useEffect(() => {
    if (! platform) return

    handleNextStep(platform)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform])

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
              <div className="flex flex-col xs:flex-row xs:justify-center mb-5">
                {platforms.map((platform) => {
                  return (
                    <ObjectiveButton
                      key={platform.value}
                      platform={platform}
                      setPlatform={setPlatform}
                      className="first:mb-4 xs:first:mb-0 xs:first:mr-12"
                    />
                  )
                })}
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
