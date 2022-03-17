import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import GetStartedPlatformButton from '@/app/GetStartedPlatformButton'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useControlsStore from '@/app/stores/controlsStore'

import { updateArtist, platforms, getPreferencesObject } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform, setDefaultLink } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  postsPreferences: state.postsPreferences,
  updateLinks: state.updateLinks,
})

const GetStartedPlatform = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const {
    updatePreferences,
    optimizationPreferences,
    postsPreferences,
    nestedLinks,
    updateLinks,
  } = useControlsStore(getControlsStoreState)
  const { objective, platform: currentPlatform } = optimizationPreferences
  const { defaultLinkId } = postsPreferences

  const unsetDefaultLink = async () => {
    const { res: newArtist } = await setDefaultLink(artistId, null)

    // Unset the link in the controls store
    updateLinks('chooseNewDefaultLink', { newArtist, newLink: null })

    // Update the post preferences object
    updatePreferences({
      postsPreferences: {
        defaultLinkId: null,
      },
    })

    // Update artist context
    setPostPreferences('default_link_id', null)
  }

  const handleNextStep = async (platform) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'
    const nextStep = isFacebookOrInstagram ? 3 : 2

    // If the platform hasn't changed just go to the next step
    if (platform === currentPlatform) {
      goToStep(nextStep)
      return
    }

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        platform,
        defaultLink: isFacebookOrInstagram ? platform : null,
      }))

      updatePreferences({
        optimizationPreferences: {
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
      defaultLink: isFacebookOrInstagram ? getLinkByPlatform(nestedLinks, platform).id : defaultLinkId,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (isFacebookOrInstagram) {
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist })
    } else {
      // Unset the default link
      await unsetDefaultLink()
    }

    // Update preferences in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    saveTargetingSettings({
      ...targetingState,
      platforms: isFacebookOrInstagram ? [platform] : [],
    })

    setIsLoading(false)
    goToStep(nextStep)
  }

  React.useEffect(() => {
    if (!selectedPlatform) return

    handleNextStep(selectedPlatform)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlatform])

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-xl">{copy.platformSubtitle}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.platformDescription} />
      <Error error={error} />
      <div className="flex flex-1 flex-wrap">
        <div className="flex flex-wrap justify-center content-center w-full sm:w-3/4 mx-auto">
          {platforms.map((platform) => {
            return (
              <GetStartedPlatformButton
                key={platform.value}
                platform={platform}
                isLoading={isLoading}
                setSelectedPlatform={setSelectedPlatform}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

GetStartedPlatform.propTypes = {
}

GetStartedPlatform.defaultProps = {
}

export default GetStartedPlatform
