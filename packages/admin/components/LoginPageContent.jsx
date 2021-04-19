// * ADMIN VERSION

// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import LoginWithEmail from '@/admin/LoginWithEmail'
// Import styles
import styles from '@/LoginPage.module.css'

function LoginPageContent() {
  // IMPORT CONTEXTS
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className={styles.container}>
      <Error className={styles.error} error={authError} />
      <LoginWithEmail className={styles.form} />
    </div>
  )
}

export default LoginPageContent
