import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/UserContext'

import Input from '@/elements/Input'
import CheckboxInput from '@/elements/CheckboxInput'

const AccountPageDetailsEmail = ({
  email,
  contactEmail,
  hasEmailAuth,
  useCustomContactEmail,
  setUseCustomContactEmail,
  handleChange,
  loading,
}) => {
  const { user } = React.useContext(UserContext)
  const {
    pending_email: pendingEmail,
    email_verified: emailVerified,
    pending_contact_email: pendingContactEmail,
    contact_email_verified: contactEmailVerified,
  } = user

  console.log('pendingEmail', pendingEmail)
  console.log('emailVerified', emailVerified)
  console.log('pendingContactEmail', pendingContactEmail)
  console.log('contactEmailVerified', contactEmailVerified)

  return (
    <>
      <Input
        name="email"
        label={hasEmailAuth ? 'Email' : 'Contact Email'}
        tooltipMessage={!hasEmailAuth ? 'This is where you will receive important notifications from Feed.' : ''}
        placeholder=""
        value={email}
        handleChange={handleChange}
        type="email"
        required
        disabled={loading}
      />
      {!emailVerified && (
        <p className="text-sm font-bold text-red -mt-5">Waiting to verify, check your email.</p>
      )}
      {/* CONTACT EMAIL */}
      {hasEmailAuth && (
        <>
          {/* CHOOSE SAME EMAIL */}
          <CheckboxInput
            label="Contact email"
            buttonLabel="Use my account email"
            value="Y"
            tooltipMessage="This is where you will receive important notifications from Feed."
            checked={!useCustomContactEmail}
            required
            disabled={loading}
            onChange={() => {
              setUseCustomContactEmail(!useCustomContactEmail)
            }}
          />
          {/* CONTACT EMAIL INPUT */}
          <Input
            name="contactEmail"
            placeholder=""
            value={useCustomContactEmail ? contactEmail : email}
            handleChange={handleChange}
            type="email"
            disabled={loading || !useCustomContactEmail}
          />
        </>
      )}
    </>
  )
}

AccountPageDetailsEmail.propTypes = {
  email: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  hasEmailAuth: PropTypes.bool.isRequired,
  useCustomContactEmail: PropTypes.bool.isRequired,
  setUseCustomContactEmail: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
}

AccountPageDetailsEmail.defaultProps = {
  loading: false,
  className: null,
}

export default AccountPageDetailsEmail
