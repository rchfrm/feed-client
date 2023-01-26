import React from 'react'
// import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'
import Link from 'next/link'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Success from '@/elements/Success'

import { parseUrl } from '@/helpers/utils'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import * as ROUTES from '@/app/constants/routes'

import styles from '@/LoginPage.module.css'

const badCodeErrorMessage = 'Something went wrong validating your request.'
const getSuccessMessage = (email) => `Success! Your password has been changed for the account **${email}**`

const ResetPasswordContent = () => {
  // PARSE PAGE QUERY
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  const code = query?.oobCode

  // TEST IF CODE IS VALID
  const [email, setEmail] = React.useState('')
  const [isTesting, setIsTesting] = React.useState(true)
  const [error, setError] = React.useState(null)
  useAsyncEffect(async (isMounted) => {
    if (! code) {
      setError({ message: badCodeErrorMessage })
      setIsTesting(false)
      return
    }
    const { res: email, error } = await firebaseHelpers.verifyPasswordResetCode(code)
    if (! isMounted()) return
    setIsTesting(false)
    if (error) {
      setError(error)
      return
    }
    setEmail(email)
  }, [])

  // HANDLE FORM
  const [password, setPassword] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccessful, setIsSuccessful] = React.useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await firebaseHelpers.confirmPasswordReset(code, password)
    setIsSubmitting(false)
    setError(error)
    if (error) return
    setIsSuccessful(true)
  }

  // LOADING STATE
  if (isTesting) return <Spinner />

  return (
    <div className={styles.container}>
      <Error error={error} />
      {/* Handle bad/expired code */}
      {error && error.code === 'auth/invalid-action-code' && (
        <p>
          <Link href={ROUTES.PASSWORD_FORGET}>
            <a>Try again?</a>
          </Link>
        </p>
      )}
      {/* FORM */}
      {! error && email && ! isSuccessful && (
        <>
          <p>Reset your password for <strong>{email}</strong>:</p>
          <form
            onSubmit={onSubmit}
          >
            <Input
              name="password"
              label="New password"
              placeholder=""
              value={password}
              updateValue={setPassword}
              type="password"
              disabled={isSubmitting}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                isDisabled={! password}
                isLoading={isSubmitting}
                trackComponentName="ResetPasswordContent"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
      {/* Handle success */}
      {isSuccessful && ! error && (
        <>
          <Success message={getSuccessMessage(email)} />
          <div>
            <Link href={ROUTES.LOGIN_EMAIL}>
              <Button
                size="small"
                className="w-full"
                trackComponentName="ResetPasswordContent"
              >
                Login
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

ResetPasswordContent.propTypes = {

}

ResetPasswordContent.defaultProps = {

}

export default ResetPasswordContent
