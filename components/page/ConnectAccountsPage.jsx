import React from 'react'

// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import ConnectAccountsLoader from '../ConnectAccountsLoader'
import PageHeader from '../PageHeader'

const ConnectAccountsPage = () => {
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="connect accounts" />

      <ConnectAccountsLoader />

    </div>
  )
}

ConnectAccountsPage.propTypes = {

}

export default ConnectAccountsPage
