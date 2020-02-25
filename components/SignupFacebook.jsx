// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import Button from './elements/Button'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function FbSignUpForm(props) {
// IMPORT CONTEXTS
  const { continueWithFacebook } = React.useContext(AuthContext)
  // END IMPORT CONTEXTS

  const handleClick = async e => {
    e.preventDefault()
    props.setError(null)
    // Calls firebase.doSignInWithFacebook using a redirect,
    // so that when user is returned to log in page handleRedirect is triggered
    continueWithFacebook()
  }

  return (
    <div
      className="fill-height ninety-wide"
      style={{
        width: '59.164%',
        margin: '0 auto 1.5em auto',
      }}
    >
      <Button
        version="facebook"
        width={100}
        onClick={handleClick}
      >
        Sign up with Facebook
      </Button>
    </div>
  )
}

export default FbSignUpForm
