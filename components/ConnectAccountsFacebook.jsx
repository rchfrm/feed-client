
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import ButtonFacebook from './elements/ButtonFacebook'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import Error from './elements/Error'
import styles from './ConnectAccounts.module.css'
// IMPORT STYLES

function ConnectAccountsFacebook({ errors, setErrors }) {
  const { linkFacebook } = React.useContext(AuthContext)

  // HANDLE CLICK ON 'CONNECT FACEBOOK PAGE'
  const handleClick = async e => {
    e.preventDefault()
    try {
      await linkFacebook()
    } catch (err) {
      setErrors([err])
    }
  }
  // END HANDLE CLICK ON 'CONNECT FACEBOOK PAGE'

  return (
    <div className="ninety-wide">
      <div className={styles.facebookConnectContainer}>
        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

        <ButtonFacebook
          className={styles.fbButton}
          onClick={handleClick}
        >
          Continue with Facebook
        </ButtonFacebook>

        <em className={[styles.fbLegalText, 'xsmall--p'].join(' ')}>
          This allows us to connect to Facebook so that we can show you your data and promote posts on your behalf, we'll never post anything without your approval.
        </em>

      </div>
    </div>
  )
}

export default ConnectAccountsFacebook
