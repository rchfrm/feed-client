import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/UserContext'

import Input from '@/elements/Input'
import CheckboxInput from '@/elements/CheckboxInput'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'

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
    email: userEmail,
    pending_email: pendingEmail,
    email_verified: emailVerified,
    contact_email: userContactEmail,
    pending_contact_email: pendingContactEmail,
    contact_email_verified: contactEmailVerified,
  } = user

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
      {/* PENDING EMAIL MESSAGE */}
      {(!emailVerified || pendingEmail) && (
        <div className="mb-4">
          <p className="text-sm font-bold -mt-5 mb-4">
            * You need to verify {pendingEmail || userEmail} before we can set it as your new account email, please check your inbox.
          </p>
          <ConfirmEmailResendButton
            buttonText="Resend confirmation email"
            emailType="email"
          />
        </div>
      )}
      {/* CONTACT EMAIL */}
      {hasEmailAuth && (
        <div className={!useCustomContactEmail ? 'mb-8' : null}>
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
          {useCustomContactEmail && (
            <>
              <Input
                name="contactEmail"
                placeholder=""
                value={useCustomContactEmail ? contactEmail : email}
                handleChange={handleChange}
                type="email"
                disabled={loading || !useCustomContactEmail}
              />
              {(pendingContactEmail || (!contactEmailVerified && userContactEmail)) && (
                <div className="mb-8">
                  <p className="text-sm font-bold -mt-5 mb-4">
                    * You need to verify {pendingContactEmail || userContactEmail} before we can set it as your new contact email, please check your inbox.
                  </p>
                  <ConfirmEmailResendButton
                    buttonText="Resend confirmation email"
                    emailType="contactEmail"
                  />
                </div>
              )}
            </>
          )}
        </div>
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
}

AccountPageDetailsEmail.defaultProps = {
  loading: false,
}

export default AccountPageDetailsEmail
