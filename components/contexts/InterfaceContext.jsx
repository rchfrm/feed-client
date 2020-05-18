import React from 'react'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'

const initialState = {
  subNavOpen: false,
  header: {
    visible: true,
    text: '',
    punctuation: '',
  },
  globalLoading: true,
}

const initialContext = {
  // Setters
  setSubNav: () => {},
  toggleSubNav: () => {},
  setHeader: () => {},
  setGlobalLoading: () => {},
  // Getters
  subNavOpen: initialState.subNavOpen,
  header: initialState.header,
  globalLoading: initialState.globalLoading,
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

  const { subNavOpen, header, globalLoading } = interfaceState

  const toggleSubNav = React.useCallback(() => {
    setInterfaceState({ type: 'toggleSubNav' })
  }, [])

  const setSubNav = React.useCallback((state) => {
    setInterfaceState({ type: 'setSubNav', payload: { state } })
  }, [])

  const setHeader = React.useCallback(({ visible, text, punctuation = '.' }) => {
    setInterfaceState({ type: 'setHeader', payload: { visible, text, punctuation } })
  }, [])

  const setGlobalLoading = React.useCallback((state) => {
    const newState = typeof state !== 'undefined' ? state : !globalLoading
    setInterfaceState({ type: 'setGlobalLoading', payload: { state: newState } })
  }, [])

  // Set global loading to true when route changes
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setGlobalLoading(true)
    })
  }, [])

  return (
    <InterfaceContext.Provider
      value={{
        // Setters
        toggleSubNav,
        setSubNav,
        setHeader,
        setGlobalLoading,
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
