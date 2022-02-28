import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'

import ProgressBar from '@/app/ProgressBar'
import Spinner from '@/elements/Spinner'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const initialContext = {
  next: () => {},
  back: () => {},
  currentStep: 0,
  goToStep: () => {},
  wizardState: {},
  setCurrentStep: () => {},
}

const wizardStateReducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action

  switch (actionType) {
    case 'set-state': {
      return { ...draftState, ...payload }
    }
    default:
      throw new Error(`Unable to find ${action.type} in wizardReducer`)
  }
}

const WizardContext = React.createContext(initialContext)

const WizardContextProvider = ({
  steps,
  children,
  goBackToPath,
  isLoading,
  hasBackButton,
}) => {
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

  const goToPage = () => {
    Router.push({
      pathname: goBackToPath,
      query: { postStatus: 'not-run' },
    })
  }

  React.useEffect(() => {
    if (isLoading) return

    const firstIncompleteStep = steps.findIndex((step) => {
      if (!step.shouldSkip && step.id !== 0) {
        setStepsHistory((steps) => [...steps, step.id])
      }

      if (wizardState[step.id]?.forceShow) {
        return step
      }

      return !step.isComplete && !step.shouldSkip
    })

    setCurrentStep(firstIncompleteStep)
    // eslint-disable-next-line
  }, [isLoading])

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
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
            <a
              role="button"
              onClick={goToPage}
              className="flex ml-auto text-grey-2 no-underline"
            >
              Let me see the app first
            </a>
          </div>
        </>
      )}
    </WizardContext.Provider>
  )
}

WizardContextProvider.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  children: PropTypes.node.isRequired,
  goBackToPath: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  hasBackButton: PropTypes.bool,
}

WizardContextProvider.defaultProps = {
  goBackToPath: '',
  hasBackButton: false,
}

export { WizardContext, WizardContextProvider }
