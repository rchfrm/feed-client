import React, { Dispatch, SetStateAction } from 'react'
import useAlertModal from '@/hooks/useAlertModal'
import TargetingInterests from '@/app/TargetingInterests'
import { ButtonProps } from '@/elements/Button'
import { AlertButton } from '@/stores/alertStore'

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

    const buttons: AlertButton[] = [
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
      copy: 'Add interests',
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
