import React from 'react'
import PropTypes from 'prop-types'

const initialContext = {
  next: () => {},
  back: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
}

const WizardContext = React.createContext(initialContext)

const WizardContextProvider = ({ steps, children }) => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const totalSteps = steps.length - 1
  const shouldSkipStep = steps[currentStep].shouldSkip

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
      {!shouldSkipStep && children[currentStep]}
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
}

export { WizardContext, WizardContextProvider }
