import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedAdPreviewStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <Button
        version="green"
        onClick={handleNext}
        trackComponentName="GetStartedAdPreviewStep"
      >
        Done
      </Button>
    </div>
  )
}

GetStartedAdPreviewStep.propTypes = {
}

GetStartedAdPreviewStep.defaultProps = {
}

export default GetStartedAdPreviewStep
