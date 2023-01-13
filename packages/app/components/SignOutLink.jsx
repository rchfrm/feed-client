// * APP VERSION

// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import useSignOut from '@/app/hooks/useSignOut'

const SignOutLink = ({ className }) => {
  const signOut = useSignOut()
  return (
    <a className={[className, 'no-underline'].join(' ')} role="button" version="sign-out" onClick={signOut}>
      sign out
    </a>
  )
}

SignOutLink.propTypes = {
  className: PropTypes.string,
}

SignOutLink.defaultProps = {
  className: null,
}

export default SignOutLink
