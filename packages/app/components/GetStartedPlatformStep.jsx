import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedPlatformStep = () => {
  const { goToStep } = React.useContext(WizardContext)

  const handleNextStep = (platform) => {
    const nextStep = platform === 'facebook' || platform === 'instagram' ? 4 : 2

    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-wrap justify-center items-center">
      <Button
        version="outline-black"
        onClick={() => handleNextStep('spotify')}
        className="w-1/3"
      >
        Spotify
      </Button>
      <Button
        version="outline-black"
        onClick={() => handleNextStep('youtube')}
        className="w-1/3"
      >
        Youtube
      </Button>
      <Button
        version="outline-black"
        onClick={() => handleNextStep('sound cloud')}
        className="w-1/3"
      >
        SoundCloud
      </Button>
      <Button
        version="outline-black"
        onClick={() => handleNextStep('instagram')}
        className="w-1/3"
      >
        Instagram
      </Button>
      <Button
        version="outline-black"
        onClick={() => handleNextStep('facebook')}
        className="w-1/3"
      >
        Facebook
      </Button>
    </div>
  )
}

GetStartedPlatformStep.propTypes = {
}

GetStartedPlatformStep.defaultProps = {
}

export default GetStartedPlatformStep
