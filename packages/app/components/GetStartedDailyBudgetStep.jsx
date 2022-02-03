import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'

const GetStartedDailyBudgetStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
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

GetStartedDailyBudgetStep.propTypes = {
}

GetStartedDailyBudgetStep.defaultProps = {
}

export default GetStartedDailyBudgetStep
