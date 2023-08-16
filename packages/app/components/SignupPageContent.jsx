import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Error from '@/elements/Error'
import Anchor from '@/landing/elements/Anchor'

const SignupPageContent = () => {
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className="flex m-auto max-w-4xl">
      <div className="flex-1">
        <div className="sm:mr-6 md:mr-12">
          <Error error={authError} />
          <h2 className="mb-8 text-2xl">Request access</h2>
          <p>We are not currently accepting new sign ups to Feed.</p>
          <p>If you would like to try the platform, please email <Anchor href="mailto:help@tryfeed.co">help@tryfeed.co</Anchor>.</p>
        </div>
      </div>
    </div>
  )
}

export default SignupPageContent
