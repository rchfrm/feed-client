import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

const ObjectiveSettingsChangeAlert = ({
  objectiveChangeSteps,
  show,
  onCancel,
}) => {
  const [data, setData] = React.useState(null)
  const [shouldStoreData, setShouldStoreData] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)

  const alertContents = React.useMemo(() => {
    // Add additional props to the alert content component
    const StepComponent = React.cloneElement(
      objectiveChangeSteps[currentStep].component,
      {
        data,
        setData,
        shouldStoreData,
        setShouldStoreData,
        setIsDisabled,
      },
    )

    if (objectiveChangeSteps.length) {
      return StepComponent
    }
  }, [objectiveChangeSteps, currentStep, data, shouldStoreData])

  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (!show) return closeAlert()

    const buttons = [
      {
        text: 'Save',
        onClick: () => {
          setShouldStoreData(true)
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
  }, [show, onCancel, alertContents, showAlert, closeAlert, currentStep, objectiveChangeSteps.length, isDisabled])

  React.useEffect(() => {
    // Check if is last step
    if (currentStep + 1 === objectiveChangeSteps.length) return

    if (!shouldStoreData && data) {
      setCurrentStep((currentStep) => currentStep + 1)
    }
  }, [data, shouldStoreData, currentStep, objectiveChangeSteps.length])

  // Clear store and hide alert when unmounting
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
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlert.defaultProps = {
}

export default ObjectiveSettingsChangeAlert
