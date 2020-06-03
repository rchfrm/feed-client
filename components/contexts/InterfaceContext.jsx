import React from 'react'
import Router, { useRouter } from 'next/router'

import { useImmerReducer } from 'use-immer'

const initialState = {
  subNavOpen: false,
  header: {
    visible: true,
    text: '',
    punctuation: '',
  },
  globalLoading: true,
  showSpinner: false,
}

const initialContext = {
  // Setters
  toggleSubNav: () => {},
  setHeader: () => {},
  toggleGlobalLoading: () => {},
  toggleGlobalLoadingSpinner: () => {},
  // Getters
  subNavOpen: initialState.subNavOpen,
  header: initialState.header,
  globalLoading: initialState.globalLoading,
  showSpinner: initialState.showSpinner,
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
      draftState.subNavOpen = typeof payload.state === 'boolean' ? payload.state : !draftState.subNavOpen
      break
    case 'toggleGlobalLoading':
      draftState.globalLoading = typeof payload.state === 'boolean' ? payload.state : !draftState.globalLoading
      break
    case 'toggleGlobalLoadingSpinner':
      draftState.showSpinner = typeof payload.state === 'boolean' ? payload.state : !draftState.showSpinner
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
  const { subNavOpen, header, globalLoading, showSpinner } = interfaceState

  const toggleSubNav = React.useCallback((state) => {
    setInterfaceState({ type: 'toggleSubNav', payload: { state } })
  }, [setInterfaceState])

  const setHeader = React.useCallback(({ visible, text, punctuation = '.' }) => {
    setInterfaceState({ type: 'setHeader', payload: { visible, text, punctuation } })
  }, [setInterfaceState])

  const toggleGlobalLoading = React.useCallback((state) => {
    setInterfaceState({ type: 'toggleGlobalLoading', payload: { state } })
  }, [setInterfaceState])

  const toggleGlobalLoadingSpinner = React.useCallback((state) => {
    setInterfaceState({ type: 'toggleGlobalLoadingSpinner', payload: { state } })
  }, [setInterfaceState])

  // Hide spinner when global loading is false
  React.useEffect(() => {
    if (!globalLoading) toggleGlobalLoadingSpinner(false)
  }, [globalLoading, toggleGlobalLoadingSpinner])

  // Set global loading to true when route changes
  const { pathname } = useRouter()
  const previousPathname = React.useRef(pathname)
  const handleRouteEnd = (url) => {
    previousPathname.current = url
  }
  const handleRouteChange = React.useCallback((newUrl) => {
    const { current: previousUrl } = previousPathname
    // Don't trigger loading if nav-ing to query path
    if (newUrl.includes('?')) return
    // close sub nav
    toggleSubNav(false)
    // If same page, no loading
    if (newUrl === previousUrl) return
    // Set global loading
    toggleGlobalLoading(true)
  }, [toggleGlobalLoading, toggleSubNav])
  React.useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange)
    Router.events.on('routeChangeComplete', handleRouteEnd)
  }, [handleRouteChange])

  return (
    <InterfaceContext.Provider
      value={{
        // Setters
        toggleSubNav,
        setHeader,
        toggleGlobalLoading,
        toggleGlobalLoadingSpinner,
        // Getters
        globalLoading,
        showSpinner,
        subNavOpen,
        header,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

export { InterfaceContext, InterfaceContextProvider }
