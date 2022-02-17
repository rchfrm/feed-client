import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useControlsStore from '@/app/stores/controlsStore'

import { updateArtist } from '@/app/helpers/artistHelpers'

import { capitalise, getLocalStorage, setLocalStorage } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
})

const GetStartedPlatform = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)
  const { updatePreferences, optimizationPreferences, nestedLinks, updateLinks } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const platforms = ['spotify', 'youtube', 'soundcloud', 'instagram', 'facebook']

  const handleNextStep = async (platform) => {
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

    setIsLoading(false)
    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-4 font-medium text-xl">{copy.platformSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.platformDescription} />
      <Error error={error} />
      <div className="flex flex-1 flex-wrap">
        <div className="flex flex-wrap justify-center content-center w-full sm:w-3/4 mb-5 sm:mb-0 mx-auto">
          {platforms.map((platform) => {
            return (
              <ButtonPill
                key={platform}
                className="w-32 sm:w-48 mx-0 mx-3 mb-5"
                onClick={() => handleNextStep(platform)}
                loading={isLoading}
                style={{
                  border: `2px solid ${brandColors.textColor}`,
                }}
                hasIcon
                trackComponentName="GetStartedPlatformStep"
              >
                <PlatformIcon
                  platform={platform}
                  className="mr-5"
                  title={platform}
                  fill={brandColors[platform].bg}
                />
                {capitalise(platform)}
              </ButtonPill>
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
