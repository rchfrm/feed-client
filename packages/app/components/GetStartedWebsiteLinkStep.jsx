import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedLinkStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <Button
        version="outline-green"
        onClick={handleNext}
        trackComponentName="GetStartedWebsiteLinkStep"
      >
        Next
      </Button>
    </div>
  )
}

GetStartedLinkStep.propTypes = {
}

GetStartedLinkStep.defaultProps = {
}

export default GetStartedLinkStep
