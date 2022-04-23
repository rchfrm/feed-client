import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useAlertModal from '@/hooks/useAlertModal'

const ObjectiveSettingsChangeAlert = ({
  objectiveChangeSteps,
  shouldShowAlert,
  onCancel,
  save,
  objective,
  platform,
  setPlatform,
}) => {
  const [shouldSave, setShouldSave] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [forceSave, setForceSave] = React.useState(false)

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
          setIsDisabled,
          objective,
          platform,
          setPlatform,
          setForceSave,
        },
      )
      return StepComponent
    }
  }, [objectiveChangeSteps, currentStep, shouldSave, platform, setPlatform, objective])

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

  // Either go to next step or close the modal if we're at the last step
  useAsyncEffect(async () => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if ((isLastStep && !shouldSave) || forceSave) {
      await save({ objective, platform }, [], true)
      closeAlert()
      return
    }

    if (!shouldSave && !isLastStep) {
      setCurrentStep((currentStep) => currentStep + 1)
    }
  }, [shouldSave, forceSave])

  // Hide alert when unmounting
  React.useEffect(() => {
    return () => {
      closeAlert()
    }
  }, [closeAlert])

  // No render
  return null
}

ObjectiveSettingsChangeAlert.propTypes = {
  objectiveChangeSteps: PropTypes.array.isRequired,
  shouldShowAlert: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlert.defaultProps = {
}

export default ObjectiveSettingsChangeAlert
