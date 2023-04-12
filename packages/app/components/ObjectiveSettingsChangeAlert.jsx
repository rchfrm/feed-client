import React from 'react'
import PropTypes from 'prop-types'
import useAlertModal from '@/hooks/useAlertModal'
import ObjectiveSettingsChangeAlertDefaultLink from '@/app/ObjectiveSettingsChangeAlertDefaultLink'

const ObjectiveSettingsChangeAlert = ({
  objective,
  shouldShowAlert,
  setShouldShowAlert,
  onCancel,
  onConfirm,
}) => {
  const [link, setLink] = React.useState('')
  const [isDisabled, setIsDisabled] = React.useState(true)
  const { showAlert, closeAlert } = useAlertModal()

  // Set alert content and buttons
  React.useEffect(() => {
    if (! shouldShowAlert) return closeAlert()

    const buttons = [
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
        },
        version: 'secondary',
      },
      {
        text: 'Save',
        onClick: () => {
          onConfirm({ link }, true)
          setShouldShowAlert(false)
        },
        isDisabled,
      },
    ]
    showAlert({
      children: (
        <ObjectiveSettingsChangeAlertDefaultLink
          link={link}
          setLink={setLink}
          objective={objective}
          setIsDisabled={setIsDisabled}
        />
      ),
      buttons,
      onClose: onCancel,
    })
  }, [shouldShowAlert, onConfirm, onCancel, showAlert, closeAlert, link, objective, isDisabled, setShouldShowAlert])

  React.useEffect(() => {
    return () => {
      closeAlert(false)
    }
  }, [closeAlert])

  return null
}

ObjectiveSettingsChangeAlert.propTypes = {
  objective: PropTypes.string.isRequired,
  shouldShowAlert: PropTypes.bool.isRequired,
  setShouldShowAlert: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ObjectiveSettingsChangeAlert
