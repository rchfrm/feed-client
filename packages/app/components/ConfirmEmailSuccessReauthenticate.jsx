import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { AuthContext } from '@/contexts/AuthContext'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as ROUTES from '@/app/constants/routes'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

const ConfirmEmailSuccessReauthenticate = ({ email, onContinue }) => {
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const { storeAuth } = React.useContext(AuthContext)

  const onFormSubmit = async (e) => {
    e.preventDefault()

    const { authUser, error } = await firebaseHelpers.doReauthenticateWithCredential(email, password)
    if (error) {
      setError(error)
      return
    }

    const { user } = authUser
    const token = await user.getIdToken()
      .catch((error) => {
        return { error }
      })

    if (token.error) {
      setError(token.error)
      return
    }
    storeAuth({ authUser: user, authToken: token })
    onContinue()
  }

  const handleChange = (e) => {
    const { target: { value } } = e
    setPassword(value)
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-column"
    >
      <Input
        name="password"
        placeholder=""
        value={password}
        handleChange={handleChange}
        type="password"
        label="Password"
        version="box"
        width={100}
      />
      <Error error={error} />
      <p className="small--p">
        <Link href={ROUTES.PASSWORD_FORGET}><a>Forgot your Password?</a></Link>
      </p>
      <Button
        size="small"
        className="ml-auto w-1/3"
        onClick={onFormSubmit}
        trackComponentName="ConfirmEmailSuccessReauthenticate"
      >
        Log in
      </Button>
    </form>
  )
}

ConfirmEmailSuccessReauthenticate.propTypes = {
  email: PropTypes.string.isRequired,
  onContinue: PropTypes.func,
}

ConfirmEmailSuccessReauthenticate.defaultProps = {
  onContinue: () => {},
}

export default ConfirmEmailSuccessReauthenticate
