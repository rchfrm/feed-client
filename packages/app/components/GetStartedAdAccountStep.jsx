import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedAdAccountStep = () => {
  const { goToStep, wizardState } = React.useContext(WizardContext)

  const handleNext = () => {
    const nextStep = wizardState.objective === 'growth' ? 8 : 9
    goToStep(nextStep)
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

GetStartedAdAccountStep.propTypes = {
}

GetStartedAdAccountStep.defaultProps = {
}

export default GetStartedAdAccountStep
