import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'
import Error from '@/elements/Error'

import useControlsStore from '@/app/stores/controlsStore'

import { updatePlatform } from '@/app/helpers/artistHelpers'

import { capitalise, getLocalStorage, setLocalStorage } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const GetStartedPlatformStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep } = React.useContext(WizardContext)
  const { updatePreferences } = useControlsStore(getControlsStoreState)
  const { artistId } = React.useContext(ArtistContext)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const platforms = ['spotify', 'youtube', 'soundcloud', 'instagram', 'facebook']

  const handleNextStep = async (platform) => {
    const nextStep = platform === 'facebook' || platform === 'instagram' ? 3 : 2

    // If there's no connected account yet store the data in local storage
    if (!artistId) {
      setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, platform }))
      goToStep(nextStep)
      return
    }

    setIsLoading(true)

    // Otherwise save the data in the db
    const { res: artist, error } = await updatePlatform(artistId, platform)

    if (error) {
      setError({ message: error.message })
      setIsLoading(false)
      return
    }

    // Update global store value
    updatePreferences(
      'optimizationPreferences',
      { platform: artist.preferences.optimization.platform },
    )

    setIsLoading(false)
    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Which platform would you like to grow?</h3>
      <div className="flex flex-1 flex-wrap">
        <Error error={error} />
        <div className="flex flex-wrap justify-center content-center w-full sm:w-3/4 mx-auto">
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

GetStartedPlatformStep.propTypes = {
}

GetStartedPlatformStep.defaultProps = {
}

export default GetStartedPlatformStep
