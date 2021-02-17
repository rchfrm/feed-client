import React from 'react'
import PropTypes from 'prop-types'

const SignupRedirect = ({ redirectTo }) => {
  React.useEffect(() => {
    window.location.replace(redirectTo)
  // eslint-disable-next-line
  }, [])
  return null
}

SignupRedirect.propTypes = {
  redirectTo: PropTypes.string.isRequired,
}

export default SignupRedirect
