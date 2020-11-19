import React from 'react'

import useAlertStore from '@/store/alertStore'

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


const useAlertModal = (props) => {
  const close = useAlertStore(state => state.close)
  const open = useAlertStore(state => state.open)
  const setCopy = useAlertStore(state => state.setCopy)
  const setChildren = useAlertStore(state => state.setChildren)
  const setButtons = useAlertStore(state => state.setButtons)
  const setOnClose = useAlertStore(state => state.setOnClose)

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
