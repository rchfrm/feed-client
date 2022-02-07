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
    <div className="flex flex-1 flex-column justify-center">
      <div className="xs:flex justify-between xs:-mx-4 mb-10 xs:mb-20">
        <Button
          version="green"
          onClick={() => handleNextStep('growth')}
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
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
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
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
          className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
        >
          Website visits
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
      <p className="w-full xs:text-center underline">Something else?</p>
    </div>
  )
}

GetStartedObjectiveStep.propTypes = {
}

GetStartedObjectiveStep.defaultProps = {
}

export default GetStartedObjectiveStep
