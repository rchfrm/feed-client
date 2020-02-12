// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
// IMPORT ELEMENTS
import PageHeader from '../elements/PageHeader'
import Spinner from '../elements/Spinner'
// IMPORT PAGES
import Details from '../AccountPageDetails'
import Integrations from '../AccountPageIntegrations'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES

function AccountPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  // IMPORT USER STATE
  const { user, userLoading } = React.useContext(UserContext)
  // END IMPORT USER STATE

  if (userLoading) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  }
  return (
    <div className={`page-container ${className}`}>

      <PageHeader heading={user.first_name ? `Hey ${user.first_name}` : 'Hey'} punctuation="," />

      <Details />

      <Integrations />

      {/* <Payments /> */}

    </div>
  )
}

export default AccountPage
