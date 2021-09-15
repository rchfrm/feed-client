import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from '@/app/ProgressBar'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const initialContext = {
  next: () => {},
  back: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
}

const WizardContext = React.createContext(initialContext)

const WizardContextProvider = ({ steps, children, hasBackButton }) => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const { hasSkipButton = false } = steps[currentStep]
  const totalSteps = steps.length - 1
  const isFirstStep = currentStep === 0

  const next = React.useCallback(() => {
    if (currentStep === totalSteps) return
    setCurrentStep(currentStep + 1)
  }, [currentStep, totalSteps])

  const back = () => {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }

  return (
    <WizardContext.Provider
      value={{
        next,
        back,
        currentStep,
        setCurrentStep,
      }}
    >
      <h2>{steps[currentStep].title}</h2>
      <ProgressBar percentage={((currentStep + 1) / (totalSteps + 1)) * 100} className="mb-6" />
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
        {hasSkipButton && (
          <a
            role="button"
            onClick={next}
            className="flex text-grey-2 no-underline ml-auto"
          >
            Skip
            <ArrowAltIcon
              className="w-3 ml-3"
              direction="right"
              fill={brandColors.grey}
            />
          </a>
        )}
      </div>
    </WizardContext.Provider>
  )
}

WizardContextProvider.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      shouldSkip: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  hasBackButton: PropTypes.bool,
}

WizardContextProvider.defaultProps = {
  hasBackButton: false,
}

export { WizardContext, WizardContextProvider }
