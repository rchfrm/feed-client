import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'

import ProgressBar from '@/app/ProgressBar'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const initialContext = {
  next: () => {},
  back: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
}

const wizardStateReducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action

  switch (actionType) {
    case 'set-state': {
      draftState[payload.key] = payload.value
      break
    }
    default:
      throw new Error(`Unable to find ${action.type} in wizardReducer`)
  }
}

const WizardContext = React.createContext(initialContext)

const WizardContextProvider = ({ steps, children, hasBackButton }) => {
  const [wizardState, setWizardState] = useImmerReducer(wizardStateReducer, {})
  const [currentStep, setCurrentStep] = React.useState(0)
  const [stepsHistory, setStepsHistory] = React.useState([0])
  const totalSteps = steps.length - 1
  const isFirstStep = currentStep === 0

  const next = React.useCallback(() => {
    if (currentStep === totalSteps) return

    setCurrentStep(currentStep + 1)
    setStepsHistory([...stepsHistory, currentStep + 1])
  }, [currentStep, totalSteps, stepsHistory])

  const back = () => {
    if (currentStep === 0) return
    const filteredSteps = stepsHistory.filter((step) => step !== currentStep)

    setStepsHistory(filteredSteps)
    setCurrentStep(filteredSteps[filteredSteps.length - 1])
  }

  const goToStep = (step) => {
    setCurrentStep(step)
    setStepsHistory([...stepsHistory, step])
  }

  React.useEffect(() => {
    const firstIncompleteStep = steps.findIndex((step) => {
      if (!step.shouldSkip && step.id !== 0) {
        setStepsHistory((steps) => [...steps, step.id])
      }
      return !step.isComplete && !step.shouldSkip
    })

    setCurrentStep(firstIncompleteStep)
  }, [])

  React.useEffect(() => {
    console.log(stepsHistory)
  }, [stepsHistory])

  return (
    <WizardContext.Provider
      value={{
        next,
        back,
        currentStep,
        goToStep,
        wizardState,
        setWizardState,
      }}
    >
      <h2>{steps[currentStep].title}</h2>
      <ProgressBar percentage={((currentStep + 1) / (totalSteps + 1)) * 100} className="mb-8" />
      {children[currentStep]}
      <div className="w-full mt-auto flex justify-between">
        {(hasBackButton && !isFirstStep) ? (
          <a
            role="button"
            onClick={back}
            className="flex text-grey-2 no-underline"
          >
            <ArrowAltIcon
              className="w-3 mr-3"
              direction="left"
              fill={brandColors.grey}
            />
            Back
          </a>
        ) : null}
      </div>
    </WizardContext.Provider>
  )
}

WizardContextProvider.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  hasBackButton: PropTypes.bool,
}

WizardContextProvider.defaultProps = {
  hasBackButton: false,
}

export { WizardContext, WizardContextProvider }
