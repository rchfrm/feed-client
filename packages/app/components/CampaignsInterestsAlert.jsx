import React from 'react'
import PropTypes from 'prop-types'
import useAlertModal from '@/hooks/useAlertModal'
import TargetingInterests from '@/app/TargetingInterests'

const CampaignsInterestsAlert = ({
  shouldShowAlert,
  setShouldShowAlert,
  onCancel,
  onConfirm,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  // Set alert content and buttons
  React.useEffect(() => {
    if (! shouldShowAlert) {
      return closeAlert()
    }

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
        onClick: async () => {
          await onConfirm()
          setShouldShowAlert(false)
        },
        isDisabled: false,
      },
    ]
    showAlert({
      children: (
        <TargetingInterests className="h-[360px]" />
      ),
      buttons,
      onClose: onCancel,
    })
  }, [shouldShowAlert, onConfirm, onCancel, showAlert, closeAlert, setShouldShowAlert])

  React.useEffect(() => {
    return () => {
      closeAlert(false)
    }
  }, [closeAlert])

  return null
}

CampaignsInterestsAlert.propTypes = {
  shouldShowAlert: PropTypes.bool.isRequired,
  setShouldShowAlert: PropTypes.func.isRequired,
}

export default CampaignsInterestsAlert
