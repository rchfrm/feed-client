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
  const createPixel = React.useCallback(async (pixelName) => {
    const { res, error } = await createNewPixel(artistId, pixelName)
    if (error) {
      onError(error)
      // eslint-disable-next-line
      openNewPixelModal(error)
      return
    }
    onSave(res)
  // eslint-disable-next-line
  }, [artistId, onError, onSave])

  // OPEN MODAL
  const openNewPixelModal = React.useCallback((error) => {
    const buttons = [
      {
        text: 'Cancel',
        onClick: () => {
          closeAlert()
          onCancel()
        },
        version: 'secondary',
      },
      {
        text: 'Save pixel',
        onClick: () => {}, // updated in modal
        id: 'save',
        disabled: true,
      },
    ]
    const children = <PixelCreatorModal modalButtons={buttons} createPixel={createPixel} error={error} />
    showAlert({ children, buttons, onClose: onCancel })
  // eslint-disable-next-line
  }, [createPixel])

  return openNewPixelModal
}

export default useCreateNewPixel
