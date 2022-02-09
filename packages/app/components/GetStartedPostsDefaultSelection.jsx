import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedPostsDefaultSelectionStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="w-full mb-0 font-medium text-xl">Are you happy for Feed to continue selecting the best posts on your behalf?</h3>
      <div className="flex flex-1 justify-center items-center">
        <Button
          version="outline-black"
          onClick={handleNext}
          className="w-56 mx-4"
          trackComponentName="GetStartedPostsStep"
        >
          No
        </Button>
        <Button
          version="outline-black"
          onClick={handleNext}
          className="w-56 mx-4"
          trackComponentName="GetStartedPostsStep"
        >
          Yes
        </Button>
      </div>
    </div>
  )
}

GetStartedPostsDefaultSelectionStep.propTypes = {
}

GetStartedPostsDefaultSelectionStep.defaultProps = {
}

export default GetStartedPostsDefaultSelectionStep
