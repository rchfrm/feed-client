import React from 'react'

import alertStore from '@/store/alertStore'

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
    onClick: () => { console.log('how are you?') },
    facebookButton: true,
  },
  {
    text: 'External link',
    href: 'https://www.home.com,
    color: 'green',
  }
]
*/


const useAlertModal = (props) => {
  const close = alertStore(state => state.close)
  const open = alertStore(state => state.open)
  const setCopy = alertStore(state => state.setCopy)
  const setChildren = alertStore(state => state.setChildren)
  const setButtons = alertStore(state => state.setButtons)
  const setOnClose = alertStore(state => state.setOnClose)

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

  return { showAlert, closeAlert: close }
}

export default useAlertModal
