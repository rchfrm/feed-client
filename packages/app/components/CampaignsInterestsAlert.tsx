import React, { Dispatch, SetStateAction } from 'react'
import useAlertModal from '@/hooks/useAlertModal'
import TargetingInterests from '@/app/TargetingInterests'

interface CampaignsHeaderProps {
  shouldShowAlert: boolean
  setShouldShowAlert: Dispatch<SetStateAction<boolean>>
  onCancel: () => void
  onConfirm: () => Promise<void>
}

const CampaignsInterestsAlert: React.FC<CampaignsHeaderProps> = ({
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

export default CampaignsInterestsAlert
