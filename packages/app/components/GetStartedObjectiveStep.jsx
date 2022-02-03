import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedObjectiveStep = () => {
  const { goToStep, setWizardState } = React.useContext(WizardContext)

  const handleNextStep = (objective) => {
    const nextStep = objective === 'growth' ? 1 : 3

    setWizardState({
      type: 'set-state',
      payload: {
        key: 'objective',
        value: objective,
      },
    })
    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 justify-between items-center">
      <Button
        version="green"
        onClick={() => handleNextStep('growth')}
        className="w-1/3"
      >
        Audience growth
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
      <Button
        version="pink"
        onClick={() => handleNextStep('sales')}
        className="w-1/3"
      >
        Website sales
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
      <Button
        version="blue"
        onClick={() => handleNextStep('traffic')}
        className="w-1/3"
      >
        Website visits
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </div>
  )
}

GetStartedObjectiveStep.propTypes = {
}

GetStartedObjectiveStep.defaultProps = {
}

export default GetStartedObjectiveStep
