import React from 'react'
import { useImmerReducer } from 'use-immer'

const initialState = {
  subNavOpen: false,
  globalLoading: false,
}

const initialContext = {
  // Setters
  setSubNav: () => {},
  toggleSubNav: () => {},
  // Getters
  subNavOpen: initialState.subNavOpen,
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
    case 'toggleGlobalLoading':
      draftState.globalLoading = !draftState.globalLoading
      break
    case 'setGlobalLoading':
      draftState.globalLoading = payload.state
      break
    default:
      return draftState
  }
}

const InterfaceContextProvider = ({ children }) => {
  const [interfaceState, setInterfaceState] = useImmerReducer(reducer, initialState)

  const { globalLoading, subNavOpen } = interfaceState

  const toggleSubNav = React.useCallback(() => {
    setInterfaceState({ type: 'toggleSubNav' })
  }, [])

  const setSubNav = React.useCallback((state) => {
    setInterfaceState({ type: 'setSubNav', payload: { state } })
  }, [])

  return (
    <InterfaceContext.Provider
      value={{
      // Setters
        toggleSubNav,
        setSubNav,
        // Getters
        globalLoading,
        subNavOpen,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

export { InterfaceContext, InterfaceContextProvider }
