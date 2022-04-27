import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useAlertModal from '@/hooks/useAlertModal'

import Spinner from '@/elements/Spinner'

const ObjectiveSettingsChangeAlert = ({
  objectiveChangeSteps,
  shouldShowAlert,
  setShouldShowAlert,
  onCancel,
  save,
  objective,
  platform,
  setPlatform,
  isLoading,
}) => {
  const [shouldSave, setShouldSave] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [forceSave, setForceSave] = React.useState(false)
  const [savedLink, setSavedLink] = React.useState(null)

  const isLastStep = currentStep + 1 === objectiveChangeSteps.length
  const isFirstRender = React.useRef(true)

  const alertContents = React.useMemo(() => {
    if (objectiveChangeSteps.length) {
      // Add additional props to the alert content component
      const StepComponent = React.cloneElement(
        objectiveChangeSteps[currentStep].component,
        {
          shouldSave,
          setShouldSave,
          setHasError,
          setIsDisabled,
          objective,
          platform,
          setPlatform,
          setSavedLink,
          setForceSave,
        },
      )
      return isLoading ? (
        <Spinner className="h-48 flex items-center" width={28} />
      ) : (
        StepComponent
      )
    }
  }, [objectiveChangeSteps, currentStep, shouldSave, platform, setPlatform, objective, isLoading])

  const { showAlert, closeAlert } = useAlertModal()

  // Set alert content and buttons
  React.useEffect(() => {
    if (!shouldShowAlert) return closeAlert()

    const buttons = [
      {
        text: 'Save',
        onClick: () => {
          setShouldSave(true)
        },
        color: 'green',
        shouldCloseOnConfirm: false,
        disabled: isDisabled,
      },
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
        },
        color: 'black',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
      onClose: onCancel,
    })
  }, [shouldShowAlert, onCancel, alertContents, showAlert, closeAlert, currentStep, objectiveChangeSteps.length, isDisabled, isLastStep])

  useAsyncEffect(async () => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Save objective changes and close alert if it's the last step, the step data is saved and there were no errors
    if ((isLastStep && !shouldSave && !hasError) || forceSave) {
      await save({ objective, platform, savedLink }, [], true)

      closeAlert(false)
      setShouldShowAlert(false)
      return
    }

    // Go to next step
    if (!shouldSave && !isLastStep) {
      setCurrentStep((currentStep) => currentStep + 1)
    }
  }, [shouldSave, forceSave])

  // Hide alert when unmounting
  React.useEffect(() => {
    return () => {
      closeAlert(false)
    }
  }, [closeAlert])

  // No render
  return null
}

ObjectiveSettingsChangeAlert.propTypes = {
  objectiveChangeSteps: PropTypes.array.isRequired,
  shouldShowAlert: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  setPlatform: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ObjectiveSettingsChangeAlert.defaultProps = {
}

export default ObjectiveSettingsChangeAlert
