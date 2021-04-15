import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import Input from '@/elements/Input'
import Error from '@/elements/Error'
import CheckboxInput from '@/elements/CheckboxInput'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'

const PENDING_EMAIL_NOTICE = ({
  email,
  emailType,
  isPending,
  loading,
  className,
}) => {
  const [resendEmailError, setResendEmailError] = React.useState(null)
  const message = `* You need to verify ${email}${isPending ? ` before we can set it as your new ${emailType}` : ''}, please check your inbox.`
  return (
    <div className={className} style={loading ? { opacity: 0.5 } : null}>
      <p className="text-sm font-bold -mt-5 mb-4">{message}</p>
      <Error error={resendEmailError} />
      <ConfirmEmailResendButton
        buttonText="Resend confirmation email"
        emailType="email"
        setError={setResendEmailError}
        parentLoading={loading}
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

  const contactEmailTooltipMessage = 'This is where you will receive notifications from Feed.'

  return (
    <>
      {/* USER EMAIL */}
      <Input
        name="email"
        label={hasEmailAuth ? 'Email' : 'Contact Email'}
        tooltipMessage={!hasEmailAuth ? contactEmailTooltipMessage : ''}
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
          isPending={!!pendingEmail}
          emailType={hasEmailAuth ? 'account email' : 'contact email'}
          loading={loading}
          className={hasEmailAuth ? 'mb-4' : 'mb-12'}
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
            tooltipMessage={contactEmailTooltipMessage}
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
                  isPending={!!pendingContactEmail}
                  emailType="contact email"
                  loading={loading}
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
  contactEmail: PropTypes.string,
  hasEmailAuth: PropTypes.bool.isRequired,
  useCustomContactEmail: PropTypes.bool.isRequired,
  setUseCustomContactEmail: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

AccountPageDetailsEmail.defaultProps = {
  contactEmail: '',
  loading: false,
}

export default AccountPageDetailsEmail
