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
      <h1>{steps[currentStep].title}</h1>
      <ProgressBar percentage={((currentStep + 1) / (totalSteps + 1)) * 100} className="mb-6" />
      {children[currentStep]}
      {(hasBackButton && !isFirstStep) ? (
        <div className="w-full mt-auto">
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
  hasBackButton: PropTypes.bool,
}

WizardContextProvider.defaultProps = {
  hasBackButton: false,
}

export { WizardContext, WizardContextProvider }
