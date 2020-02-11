// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

const initialState = {
  visible: false,
}

const NavigationContext = React.createContext(initialState)
NavigationContext.displayName = 'NavigationContext'

const reducer = (navState, navAction) => {
  switch (navAction.type) {
    case 'toggle':
      return { ...navState, visible: !navState.visible }
    case 'hide':
      return initialState
    case 'show':
      return { ...navState, visible: true }
    default:
      return navState
  }
}

const NavMenuProvider = ({ children }) => {
  const [navState, navDispatch] = React.useReducer(reducer, initialState)
  const value = { navState, navDispatch }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

const NavMenuConsumer = NavigationContext.Consumer

export { NavigationContext, NavMenuProvider, NavMenuConsumer }
