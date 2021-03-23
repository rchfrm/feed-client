import React from 'react'

import shallow from 'zustand/shallow'

import useAlertStore from '@/stores/alertStore'

/*
* EXAMPLE BUTTONS
buttons: [
  {
    text: 'Ok',
    onClick: 'dismiss',
    color: 'black',
  },
  {
    text: 'Connect facebook',
    onClick: () => { console.info('how are you?') },
    facebookButton: true,
  },
  {
    text: 'External link',
    href: 'https://www.home.com,
    color: 'green',
  }
]
*/


const getAlertsStoreState = (state) => ({
  close: state.close,
  open: state.open,
  setCopy: state.setCopy,
  setChildren: state.setChildren,
  setButtons: state.setButtons,
  setOnClose: state.setOnClose,
})

const useAlertModal = (props) => {
  const {
    close,
    open,
    setCopy,
    setChildren,
    setButtons,
    setOnClose,
  } = useAlertStore(getAlertsStoreState, shallow)

  const defaultButtons = React.useMemo(() => {
    return [{
      text: 'Ok',
      color: 'green',
      onClick: close,
    }]
  }, [close])
  const showAlert = React.useCallback(({ copy, children = null, buttons = defaultButtons, onClose = () => {} }) => {
    // Set store
    setCopy(copy)
    setChildren(children)
    setButtons(buttons)
    setOnClose(onClose)
    // Open
    open()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return { showAlert, closeAlert: close, setButtons }
}

export default useAlertModal
