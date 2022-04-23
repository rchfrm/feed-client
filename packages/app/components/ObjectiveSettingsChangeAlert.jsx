import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import useAlertModal from '@/hooks/useAlertModal'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'

const ObjectiveSettingsChangeAlert = ({
  objectiveChangeSteps,
  show,
  onCancel,
  currentObjective,
  setCurrentObjective,
}) => {
  const [data, setData] = React.useState(null)
  const [shouldStoreData, setShouldStoreData] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const isLastStep = currentStep + 1 === objectiveChangeSteps.length

  const { initialTargetingState, targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

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

  const saveData = React.useCallback(async () => {
    const { platform, link, budget } = data || {}

    if (platform) {
      // Set new platform
      setCurrentObjective({ ...currentObjective, platform })
    }

    if (link) {
      // Save new link
      console.log('save link')
    }

    if (budget) {
      // Save new budget
      await saveTargeting('budget', { ...targetingState, budget })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentObjective, setCurrentObjective, data])

  // Set alert content and buttons
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
  }, [show, onCancel, alertContents, showAlert, closeAlert, currentStep, objectiveChangeSteps.length, isDisabled, isLastStep])

  // Either go to next step or save all data if we're at the last step
  useAsyncEffect(async () => {
    if (data) {
      if (isLastStep && !shouldStoreData) {
        await saveData()
        return
      }

      if (!shouldStoreData && !isLastStep) {
        setCurrentStep((currentStep) => currentStep + 1)
      }
    }
  }, [shouldStoreData, saveData])

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
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlert.defaultProps = {
}

export default ObjectiveSettingsChangeAlert
