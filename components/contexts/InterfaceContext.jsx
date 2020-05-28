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
  setSubNav: () => {},
  toggleSubNav: () => {},
  setHeader: () => {},
  setGlobalLoading: () => {},
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
      draftState.subNavOpen = !draftState.subNavOpen
      break
    case 'setSubNav':
      draftState.subNavOpen = payload.state
      break
    case 'setGlobalLoading':
      draftState.globalLoading = payload.state
      draftState.showSpinner = payload.spinnerState
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

  const toggleSubNav = React.useCallback(() => {
    setInterfaceState({ type: 'toggleSubNav' })
  }, [])

  const setSubNav = React.useCallback((state) => {
    setInterfaceState({ type: 'setSubNav', payload: { state } })
  }, [])

  const setHeader = React.useCallback(({ visible, text, punctuation = '.' }) => {
    setInterfaceState({ type: 'setHeader', payload: { visible, text, punctuation } })
  }, [])

  const setGlobalLoading = React.useCallback((state, spinnerState) => {
    const newState = typeof state !== 'undefined' ? state : !globalLoading
    const newSpinnerState = newState === false ? false
      : typeof spinnerState !== 'undefined' ? spinnerState
        : showSpinner
    setInterfaceState({ type: 'setGlobalLoading', payload: { state: newState, spinnerState: newSpinnerState } })
  }, [])

  // Set global loading to true when route changes
  const { pathname } = useRouter()
  const previousPathname = React.useRef(pathname)
  const handleRouteEnd = (url) => {
    previousPathname.current = url
  }
  const handleRouteChange = React.useCallback((newUrl) => {
    const { current: previousUrl } = previousPathname
    console.log('newUrl', newUrl)
    console.log('previousUrl', previousUrl)
    // Don't trigger loading if nav-ing to query path
    if (newUrl.includes('?')) return
    // close sub nav
    setSubNav(false)
    // If same page, no loading
    if (newUrl === previousUrl) return
    // Set global loading
    setGlobalLoading(true)
  }, [pathname])
  React.useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange)
    Router.events.on('routeChangeComplete', handleRouteEnd)
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
