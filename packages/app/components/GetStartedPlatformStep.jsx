import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedPlatformStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <Button
      version="outline-green"
      onClick={handleNext}
      className=""
    >
      Next
    </Button>
  )
}

GetStartedPlatformStep.propTypes = {
}

GetStartedPlatformStep.defaultProps = {
}

export default GetStartedPlatformStep
