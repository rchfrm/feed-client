import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'

import ProgressBar from '@/app/ProgressBar'
import ChevronIcon from '@/icons/ChevronIcon'
import Spinner from '@/elements/Spinner'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import { isObject } from '@/helpers/utils'

const initialContext = {
  next: () => {},
  back: () => {},
  currentStep: 0,
  goToStep: () => {},
  wizardState: {},
  setCurrentStep: () => {},
}

const wizardStateReducer = (draftState, action) => {
  const { type: actionType, payload = {} } = action

  const {
    key,
    value,
  } = payload

  switch (actionType) {
    case 'set-state': {
      draftState[key] = isObject(value) ? { ...draftState[key], ...value } : value
      break
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
  navigation,
  hasBackButton,
  profileSetupStatus,
}) => {
  const [wizardState, setWizardState] = useImmerReducer(wizardStateReducer, { sectionColors: {} })
  const [currentStep, setCurrentStep] = React.useState(0)

  const isFirstStep = currentStep === 0
  const lastStep = steps.length - 1
  const isLastStep = currentStep === lastStep

  const next = React.useCallback(() => {
    if (currentStep === lastStep) return

    setCurrentStep(currentStep + 1)
  }, [currentStep, lastStep])

  const back = () => {
    if (currentStep === 0) return

    setCurrentStep(currentStep - 1)
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  const goToPage = () => {
    Router.push({
      pathname: goBackToPath,
      query: { postStatus: 'not-run' },
    })
  }

  React.useEffect(() => {
    if (!profileSetupStatus || currentStep) return

    const firstIncompleteStepIndex = steps.findIndex((step) => {
      return step.name === profileSetupStatus
    })

    setCurrentStep(firstIncompleteStepIndex >= 0 ? firstIncompleteStepIndex : lastStep)
    // eslint-disable-next-line
  }, [profileSetupStatus])

  return (
    <WizardContext.Provider
      value={{
        next,
        back,
        currentStep,
        steps,
        goToStep,
        wizardState,
        setWizardState,
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!isLastStep && navigation}
          <h2>{steps[currentStep].title}</h2>
          <ProgressBar percentage={((currentStep + 1) / (lastStep + 1)) * 100} className="mb-8" />
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
              className="flex items-center py-1 px-3 text-sm border border-dashed border-black rounded-full no-underline"
            >
              Let me see the app first
              <ChevronIcon
                className="h-3 ml-2"
              />
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
  hasBackButton: PropTypes.bool,
  profileSetupStatus: PropTypes.string,
}

WizardContextProvider.defaultProps = {
  goBackToPath: '',
  hasBackButton: false,
  profileSetupStatus: '',
}

export { WizardContext, WizardContextProvider }
