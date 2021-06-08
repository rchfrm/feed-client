
import React from 'react'

import Success from '@/elements/Success'

import ForgotPasswordForm from '@/app/ForgotPasswordForm'

// IMPORT STYLES
import styles from '@/LoginPage.module.css'

const ForgotPasswordContent = () => {
  const [success, setSuccess] = React.useState('')

  return (
    <div className={styles.container}>
      {success ? <Success message={success} /> : (
        <>
          <p>Enter your email address below to receive a link, and reset your password.</p>
          <ForgotPasswordForm setSuccess={setSuccess} />
        </>
      )}
    </div>
  )
}

export default ForgotPasswordContent
