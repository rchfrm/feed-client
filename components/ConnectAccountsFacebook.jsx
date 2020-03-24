
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
    <div
      className="full"
      style={{
        overflow: 'initial',
        marginTop: '1.25em',
        display: 'flex',
        justifyContent: 'center',
      }}
    >

      <div style={{
        width: '65.738%',
        margin: '0 auto',
      }}
      >

        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

        <p>&nbsp;</p>

        <ButtonFacebook
          onClick={handleClick}
          width={100}
        >
          Continue with Facebook
        </ButtonFacebook>

        <em style={{ fontSize: '0.75em', lineHeight: '1.25em', marginTop: '1em' }}>
          This allows us to connect to Facebook so that we can show you your data and promote posts on your behalf, we'll never post anything without your approval.
        </em>

      </div>

    </div>
  )
}

export default ConnectAccountsFacebook
