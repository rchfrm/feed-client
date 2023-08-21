import React from 'react'
import shallow from 'zustand/shallow'
import useAlertStore, { AlertButton } from '@/stores/alertStore'


const getAlertsStoreState = (state) => ({
  close: state.close,
  open: state.open,
  setCopy: state.setCopy,
  setChildren: state.setChildren,
  setButtons: state.setButtons,
  setOnClose: state.setOnClose,
  setIsIntegrationError: state.setIsIntegrationError,
})

const useAlertModal = () => {
  const {
    close,
    open,
    setCopy,
    setChildren,
    setButtons,
    setOnClose,
    setIsIntegrationError,
  } = useAlertStore(getAlertsStoreState, shallow)

  const defaultButtons: AlertButton[] = React.useMemo(() => {
    return [{
      text: 'Ok',
      color: 'green',
      onClick: close,
    }]
  }, [close])
  const showAlert = React.useCallback((
    {
      copy,
      children = null,
      buttons = defaultButtons,
      onClose = () => {},
      isIntegrationError = false,
    },
  ) => {
    // Set store
    setCopy(copy)
    setChildren(children)
    setButtons(buttons)
    setOnClose(onClose)
    setIsIntegrationError(isIntegrationError)
    // Open
    open()
  }, [defaultButtons, open, setButtons, setChildren, setCopy, setIsIntegrationError, setOnClose])

  return { showAlert, closeAlert: close, setButtons }
}

export default useAlertModal
