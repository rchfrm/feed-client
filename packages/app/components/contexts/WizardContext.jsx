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

const WizardContextProvider = ({ steps, children, hasNavigation }) => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const totalSteps = steps.length - 1
  const shouldSkipStep = steps[currentStep].shouldSkip
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const next = React.useCallback(() => {
    if (currentStep === totalSteps) return
    setCurrentStep(currentStep + 1)
  }, [currentStep, totalSteps])

  const back = () => {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }

  React.useEffect(() => {
    if (shouldSkipStep) next()
  }, [shouldSkipStep, currentStep, next])

  return (
    <WizardContext.Provider
      value={{
        next,
        back,
        currentStep,
        setCurrentStep,
      }}
    >
      <h1>{steps[currentStep].title}</h1>
      <ProgressBar percentage={((currentStep + 1) / (totalSteps + 1)) * 100} className="mb-6" />
      {!shouldSkipStep && children[currentStep]}
      {(hasNavigation && !isFirstStep && !isLastStep) ? (
        <div className="w-full flex justify-between mt-auto">
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
          <a
            role="button"
            onClick={next}
            className="flex text-grey-2 no-underline"
          >
            Skip
            <ArrowAltIcon
              className="w-3 ml-3"
              direction="right"
              fill={brandColors.grey}
            />
          </a>
        </div>
      ) : null}
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
  hasNavigation: PropTypes.bool,
}

WizardContextProvider.defaultProps = {
  hasNavigation: false,
}

export { WizardContext, WizardContextProvider }
