import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import GetStartedPlatformButton from '@/app/GetStartedPlatformButton'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useControlsStore from '@/app/stores/controlsStore'

import { updateArtist, platforms } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
})

const GetStartedPlatform = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const { updatePreferences, optimizationPreferences, nestedLinks, updateLinks } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const handleNextStep = async (platform) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'
    const nextStep = isFacebookOrInstagram ? 3 : 2

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, platform }))
      goToStep(nextStep)

      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: artist, error } = await updateArtist(artistId, {
      objective,
      platform,
      // If platform is Facebook or Instagram grab the link from the linkbank
      ...(isFacebookOrInstagram && { defaultLink: getLinkByPlatform(nestedLinks, platform).id }),
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (isFacebookOrInstagram) {
      updateLinks('chooseNewDefaultLink', { newArtist: artist })
    }

    // Update preferences in controls store
    updatePreferences({
      postsPreferences: {
        callToAction: artist.preferences.posts.call_to_action,
        ...(isFacebookOrInstagram && { defaultLinkId: artist.preferences.posts.default_link_id }),
      },
      optimizationPreferences: {
        platform: artist.preferences.optimization.platform,
      },
    })

    saveTargetingSettings({
      ...targetingState,
      platforms: isFacebookOrInstagram ? [platform] : [],
    })

    setIsLoading(false)
    goToStep(nextStep)
  }

  React.useEffect(() => {
    if (!selectedPlatform) return

    handleNextStep()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlatform])

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-4 font-medium text-xl">{copy.platformSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.platformDescription} />
      <Error error={error} />
      <div className="flex flex-1 flex-wrap">
        <div className="flex flex-wrap justify-center content-center w-full sm:w-3/4 mb-5 sm:mb-0 mx-auto">
          {platforms.map((platform) => {
            return (
              <GetStartedPlatformButton
                key={platform}
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
