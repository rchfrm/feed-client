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
    text: 'Ok',
    onClick: () => { console.log('how are you?') },
    color: 'black',
  }
]
*/


const useAlertModal = (props = {}) => {
  const close = alertStore(state => state.close)
  const open = alertStore(state => state.open)
  const setCopy = alertStore(state => state.setCopy)
  const setChildren = alertStore(state => state.setChildren)
  const setButtons = alertStore(state => state.setButtons)

  const defaultButtons = React.useMemo(() => {
    return [{
      text: 'Ok',
      color: 'green',
      onClick: close,
    }]
  }, [close])
  const showAlert = React.useCallback(({ copy, children = null, buttons }) => {
    const { alertCopy = '', alertChildren = null, alertButtons } = props
    // Set store
    setCopy(copy || alertCopy)
    setChildren(children || alertChildren)
    setButtons(buttons || alertButtons || defaultButtons)
    // Open
    open()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return { showAlert, closeAlert: close }
}

export default useAlertModal
