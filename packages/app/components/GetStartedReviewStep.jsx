import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedReviewStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Feed has submitted your ads for approval!</h3>
      <div className="flex flex-1 justify-center items-center">
        <Button
          version="green"
          onClick={handleNext}
          className="w-48"
          trackComponentName="GetStartedAdPreviewStep"
        >
          Done
        </Button>
      </div>
    </div>
  )
}

GetStartedReviewStep.propTypes = {
}

GetStartedReviewStep.defaultProps = {
}

export default GetStartedReviewStep
