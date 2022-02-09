import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedDefaultLinkStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Enter the link to your website.</h3>
      <div className="flex flex-1 justify-center items-center">
        <Button
          version="green"
          onClick={handleNext}
          className="w-48"
          trackComponentName="GetStartedPlatformLinkStep"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedDefaultLinkStep.propTypes = {
}

GetStartedDefaultLinkStep.defaultProps = {
}

export default GetStartedDefaultLinkStep
