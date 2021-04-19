// * ADMIN VERSION

// IMPORT PACKAGES
import React from 'react'

import useSignOut from '@/admin/hooks/useSignOut'

function SignOutLink({ className = '' }) {
  const signOut = useSignOut()
  return (
    <a className={className} role="button" version="sign-out" onClick={signOut}>
      sign out
    </a>
  )
}

export default SignOutLink
