import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedPlatformLinkStep = () => {
  const { goToStep } = React.useContext(WizardContext)

  const handleNext = () => {
    goToStep(4)
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <Button
        version="outline-green"
        onClick={handleNext}
        className=""
      >
        Next
      </Button>
    </div>
  )
}

GetStartedPlatformLinkStep.propTypes = {
}

GetStartedPlatformLinkStep.defaultProps = {
}

export default GetStartedPlatformLinkStep
