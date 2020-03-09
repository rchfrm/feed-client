// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT COMPONENTS
import LoginPageForm from '../LoginPageForm'


function LoginPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <LoginPageForm />

    </div>
  )
}

export default LoginPage
