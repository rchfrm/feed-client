import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { createNewPixel } from '@/app/helpers/settingsHelpers'

const useCreateNewPixel = ({
  artistId,
  onSave = () => {},
  onError = () => {},
  onCancel = () => {},
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()

  // SAVE PIXEL FUNCTION
  const savePixel = React.useCallback(async (pixelName) => {
    const { res, error } = await createNewPixel(artistId, pixelName)
    if (error) {
      onError(error)
      return
    }
    onSave(res)
  }, [artistId, onError, onSave])

  // OPEN MODAL
  const openNewPixelModal = React.useCallback(() => {
    const buttons = [
      {
        text: 'Save pixel',
        onClick: () => {},
        color: 'green',
        id: 'save',
      },
      {
        text: 'Cancel',
        onClick: () => {
          closeAlert()
          onCancel()
        },
        color: 'black',
      },
    ]
  }, [])

  return openNewPixelModal
}

export default useCreateNewPixel
