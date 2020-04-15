import React from 'react'
import PropTypes from 'prop-types'

// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import ConnectAccountsLoader from '../ConnectAccountsLoader'
import PageHeader from '../PageHeader'

const ConnectAccountsPage = ({ heading, punctuation, onSignUp }) => {
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading={heading} punctuation={punctuation} />

      <ConnectAccountsLoader onSignUp={onSignUp} />

    </div>
  )
}

ConnectAccountsPage.propTypes = {
  heading: PropTypes.string,
  punctuation: PropTypes.string,
  onSignUp: PropTypes.bool,
}

ConnectAccountsPage.defaultProps = {
  heading: 'connect accounts',
  punctuation: '.',
  onSignUp: false,
}


export default ConnectAccountsPage
