
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
import Error from './elements/Error'
// IMPORT STYLES

function ConnectArtistFacebook(props) {
  const { linkFacebook } = React.useContext(AuthContext)

  // REDEFINE PROPS AS VARIABLES
  const { error } = props
  const { setError } = props
  // END REDEFINE PROPS AS VARIABLES

  // HANDLE CLICK ON 'CONNECT FACEBOOK PAGE'
  const handleClick = async e => {
    e.preventDefault()
    try {
      await linkFacebook()
    } catch (err) {
      setError(err)
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
        <Error error={error} messagePrefix="Error: " />

        <p>&nbsp;</p>

        <Button
          version="facebook"
          onClick={handleClick}
          width={100}
        >
          Continue with Facebook
        </Button>

        <em style={{ fontSize: '0.75em', lineHeight: '1.25em', marginTop: '1em' }}>
          This allows us to connect to Facebook so that we can show you your data and promote posts on your behalf, we'll never post anything without your approval.
        </em>

      </div>

    </div>
  )
}

export default ConnectArtistFacebook
