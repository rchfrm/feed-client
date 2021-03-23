import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/UserContext'

import Input from '@/elements/Input'
import Error from '@/elements/Error'
import CheckboxInput from '@/elements/CheckboxInput'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'

const PENDING_EMAIL_NOTICE = ({
  email,
  emailType,
  className,
}) => {
  const [resendEmailError, setResendEmailError] = React.useState(null)
  return (
    <div className={className}>
      <p className="text-sm font-bold -mt-5 mb-4">
        * You need to verify {email} before we can set it as your new {emailType}, please check your inbox.
      </p>
      <Error error={resendEmailError} />
      <ConfirmEmailResendButton
        buttonText="Resend confirmation email"
        emailType="email"
        setError={setResendEmailError}
      />
    </div>
  )
}

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
        <PENDING_EMAIL_NOTICE
          email={pendingEmail || userEmail}
          emailType="account email"
          className="mb-4"
        />
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
                <PENDING_EMAIL_NOTICE
                  email={pendingContactEmail || userContactEmail}
                  emailType="contact email"
                  className="mb-8"
                />
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
