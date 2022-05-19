import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import GetStartedPlatformButton from '@/app/GetStartedPlatformButton'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import ArrowIcon from '@/icons/ArrowIcon'

import useControlsStore from '@/app/stores/controlsStore'

import { updateArtist, platforms, getPreferencesObject } from '@/app/helpers/artistHelpers'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/getStartedCopy'
import Spinner from '@/elements/Spinner'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  updateLinks: state.updateLinks,
})

const GetStartedPlatform = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [shouldShowMore, setShouldShowMore] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [primaryPlatform, ...secondaryPlatforms] = platforms

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
  const { objective, platform: currentPlatform } = optimizationPreferences

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

    // Update local storage default link value
    setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, defaultLink: null }))
  }

  const toggleShowMore = () => {
    setShouldShowMore(!shouldShowMore)
  }

  const handleNextStep = async (platform) => {
    const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}
    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'
    const nextStep = isFacebookOrInstagram ? 3 : 2

    // If the platform hasn't changed just go to the next step
    if (platform === currentPlatform || platform === wizardState?.platform) {
      goToStep(nextStep)
      return
    }

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({
        ...wizardState,
        platform,
        defaultLink: isFacebookOrInstagram ? { href: platform } : null,
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
      defaultLink: isFacebookOrInstagram ? getLinkByPlatform(nestedLinks, platform).id : null,
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
      unsetDefaultLink(updatedArtist)
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
      <div>
        <div className="w-3/4 lg:w-1/2 mx-auto mt-6">
          {isLoading
            ? <Spinner />
            : (
              <>
                <div className="flex flex-column items-center">
                  <GetStartedPlatformButton
                    key={primaryPlatform.value}
                    platform={primaryPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                  />
                  <div>
                    <Button
                      version="text"
                      onClick={toggleShowMore}
                      trackComponentName="GetStartedPlatform"
                      className="h-5 mb-4 text-grey-3 text-sm no-underline"
                    >
                      {shouldShowMore ? 'Hide' : 'Show more'}
                    </Button>
                    <div className={[
                      'inline-block ml-1',
                      'transition-transform duration-100 transform origin-center',
                      shouldShowMore ? 'rotate-90' : null,
                    ].join(' ')}
                    >
                      <ArrowIcon
                        direction="right"
                        className="w-2 h-2"
                        fill={brandColors.greyDark}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center content-center">
                  {shouldShowMore && (
                    secondaryPlatforms.map((platform) => {
                      return (
                        <GetStartedPlatformButton
                          key={platform.value}
                          platform={platform}
                          setSelectedPlatform={setSelectedPlatform}
                        />
                      )
                    })
                  )}
                </div>
              </>
            )}
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
