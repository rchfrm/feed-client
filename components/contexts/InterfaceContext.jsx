import React from 'react'
import { useImmerReducer } from 'use-immer'

const initialState = {
  subNavOpen: false,
  globalLoading: false,
  header: {
    visible: true,
    text: 'page title',
    punctuation: '.',
  },
}

const initialContext = {
  // Setters
  setSubNav: () => {},
  toggleSubNav: () => {},
  setHeader: () => {},
  // Getters
  subNavOpen: initialState.subNavOpen,
  globalLoading: initialState.globalLoading,
  header: initialState.header,
}

const InterfaceContext = React.createContext(initialContext)
InterfaceContext.displayName = 'InterfaceContext'

const reducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action
  switch (actionType) {
    case 'toggleSubNav':
      draftState.subNavOpen = !draftState.subNavOpen
      break
    case 'setSubNav':
      draftState.subNavOpen = payload.state
      break
    case 'toggleGlobalLoading':
      draftState.globalLoading = !draftState.globalLoading
      break
    case 'setGlobalLoading':
      draftState.globalLoading = payload.state
      break
    case 'setHeader':
      draftState.header.visible = typeof payload.visible === 'boolean' ? payload.visible : draftState.header.visible
      draftState.header.text = payload.text ? payload.text : draftState.header.text
      draftState.header.punctuation = payload.punctuation ? payload.punctuation : draftState.header.punctuation
      break
    default:
      return draftState
  }
}

const InterfaceContextProvider = ({ children }) => {
  const [interfaceState, setInterfaceState] = useImmerReducer(reducer, initialState)

  const { globalLoading, subNavOpen, header } = interfaceState

  const toggleSubNav = React.useCallback(() => {
    setInterfaceState({ type: 'toggleSubNav' })
  }, [])

  const setSubNav = React.useCallback((state) => {
    setInterfaceState({ type: 'setSubNav', payload: { state } })
  }, [])

  console.log('header', header)

  const setHeader = React.useCallback(({ visible, text, punctuation = '.' }) => {
    setInterfaceState({ type: 'setHeader', payload: { visible, text, punctuation } })
  }, [])

  return (
    <InterfaceContext.Provider
      value={{
      // Setters
        toggleSubNav,
        setSubNav,
        setHeader,
        // Getters
        globalLoading,
        subNavOpen,
        header,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

export { InterfaceContext, InterfaceContextProvider }
