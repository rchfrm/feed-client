import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import PixelCreatorModal from '@/app/PixelCreatorModal'

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
      // eslint-disable-next-line
      openNewPixelModal(error)
      return
    }
    onSave(res)
  }, [artistId, onError, onSave])

  // OPEN MODAL
  const openNewPixelModal = React.useCallback((error) => {
    const buttons = [
      {
        text: 'Save pixel',
        onClick: () => {}, // updated in modal
        color: 'green',
        id: 'save',
        disabled: true,
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
    const children = <PixelCreatorModal modalButtons={buttons} savePixel={savePixel} error={error} />
    showAlert({ children, buttons, onClose: onCancel })
  }, [savePixel])

  return openNewPixelModal
}

export default useCreateNewPixel
