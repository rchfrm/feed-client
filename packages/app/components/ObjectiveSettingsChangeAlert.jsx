import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

const ObjectiveSettingsChangeAlert = ({
  objectiveChangeSteps,
  show,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  const alertContents = React.useMemo(() => {
    if (objectiveChangeSteps.length) {
      return [objectiveChangeSteps[currentStep].component]
    }
  }, [objectiveChangeSteps, currentStep])

  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (!show) return closeAlert()

    const buttons = [
      {
        text: 'Save',
        onClick: () => {
          if (currentStep + 1 === objectiveChangeSteps.length) {
            return
          }
          setCurrentStep((currentStep) => currentStep + 1)
        },
        color: 'green',
        shouldCloseOnConfirm: false,
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
  }, [show, onCancel, alertContents, showAlert, closeAlert, currentStep, objectiveChangeSteps.length])

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
