import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPlatformStep = () => {
  const { goToStep } = React.useContext(WizardContext)
  const platforms = ['spotify', 'youtube', 'soundcloud', 'instagram', 'facebook']

  const handleNextStep = (platform) => {
    const nextStep = platform === 'facebook' || platform === 'instagram' ? 4 : 2

    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-wrap justify-center content-center w-full sm:w-3/4 mx-auto">
      {platforms.map((platform) => {
        return (
          <ButtonPill
            key={platform}
            className="w-32 sm:w-48 mx-0 mx-3 mb-5"
            onClick={() => handleNextStep(platform)}
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
  )
}

GetStartedPlatformStep.propTypes = {
}

GetStartedPlatformStep.defaultProps = {
}

export default GetStartedPlatformStep
