import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Input from '@/elements/Input'
import Button from '@/elements/Button'

import * as ROUTES from '@/app/constants/routes'

const ConfirmEmailSuccessReauthenticate = ({ email }) => {
  const [password, setPassword] = React.useState('')

  const onFormSubmit = async (e) => {
    e.preventDefault()

    // Logic to reauthenticate
    console.log(email)
    console.log(password)
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
        handleChange={setPassword}
        type="password"
        label="Password"
        version="box"
        width={100}
      />
      <p className="small--p">
        <Link href={ROUTES.PASSWORD_FORGET}><a>Forgot your Password?</a></Link>
      </p>
      <Button
        version="green small"
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
}

ConfirmEmailSuccessReauthenticate.defaultProps = {
}

export default ConfirmEmailSuccessReauthenticate
