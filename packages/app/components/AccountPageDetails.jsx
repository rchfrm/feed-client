import React from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'
import * as server from '@/helpers/sharedServer'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { track } from '@/helpers/trackingHelpers'
import ReferralCodeWidget from '@/app/ReferralCodeWidget'
import AccountPageDetailsEmail from '@/app/AccountPageDetailsEmail'
import AccountPageDetailsConfirmAlert from '@/app/AccountPageDetailsConfirmAlert'
import PendingEmailWarning from '@/app/PendingEmailWarning'
import Input from '@/elements/Input'
import ButtonNew from '@/elements/ButtonNew'
import Error from '@/elements/Error'
import useAnimateScroll from '@/hooks/useAnimateScroll'

const getChangedEmails = ({ email, contactEmail, initialEmail, initialContactEmail }) => {
  const changedEmails = []
  if (email !== initialEmail) changedEmails.push('authEmail')
  if ((contactEmail && ! initialContactEmail) || (contactEmail !== initialContactEmail && initialContactEmail)) changedEmails.push('contactEmail')
  return changedEmails
}

const testIfDetailsChanged = ({
  initialFirstName,
  initialLastName,
  firstName,
  lastName,
  emailChanged,
}) => {
  if (emailChanged) return true
  if (initialFirstName !== firstName) return true
  if (initialLastName !== lastName) return true
  return false
}

const AccountPageDetails = () => {
  // Get user context
  const { user, updateUser, hasPendingEmail } = React.useContext(UserContext)
  // Determine if user doesn't use email auth
  const { auth: { providerIds } } = React.useContext(AuthContext)
  const hasEmailAuth = providerIds.includes('password')
  // Get initial details from user
  const {
    first_name: initialFirstName,
    last_name: initialLastName,
    email: initialEmail,
    contact_email: initialContactEmail,
  } = user

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [contactEmail, setContactEmail] = React.useState('')
  const [passwordOne, setPasswordOne] = React.useState('')
  const [passwordTwo, setPasswordTwo] = React.useState('')
  const [formDisabled, setFormDisabled] = React.useState(false)

  // HANDLE CONTACT EMAIL
  const [useCustomContactEmail, setUseCustomContactEmail] = React.useState(false)
  React.useEffect(() => {
    // Stop here if not using email auth
    if (! hasEmailAuth) return
    // Check whether user has custom email set
    const usingContactEmail = !! (initialContactEmail && initialContactEmail !== initialEmail)
    setUseCustomContactEmail(usingContactEmail)
  // eslint-disable-next-line
  }, [])

  // CLEAR CONTACT EMAIL if DISABLING
  React.useEffect(() => {
    if (! useCustomContactEmail) {
      setContactEmail('')
    }
  }, [useCustomContactEmail])

  // GET SCROLL TO FUNCTION
  const scrollTo = useAnimateScroll()

  // SHOW ALERT if CHANGIN AUTH EMAIL
  const [confirmAlert, setConfirmAlert] = React.useState('')

  // SUBMIT THE FORM
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState([])
  const onSubmit = React.useCallback(async (e, forceSubmit) => {
    if (e) e.preventDefault()
    // Stop here if form is disabled
    if (formDisabled) return
    const passwordChanged = passwordOne || passwordTwo
    const changedEmails = getChangedEmails({ email, contactEmail, initialEmail, initialContactEmail })
    const emailChanged = changedEmails.length
    const accountDetailsChanged = testIfDetailsChanged({
      initialFirstName,
      initialLastName,
      firstName,
      lastName,
      emailChanged,
    })


    // Start counting errors
    const newErrors = []

    // Stop here if No name
    if (! firstName || ! lastName) {
      newErrors.push({ message: 'Please provide a name and surname.' })
    }

    // Stop here if No email
    if (! email) {
      newErrors.push({ message: 'Please provide an email.' })
    }

    // No custom email
    if (useCustomContactEmail && ! contactEmail) {
      newErrors.push({ message: 'Please provide a contact email or choose to use your account email.' })
    }

    // If not matching passwords
    if (passwordChanged && passwordOne !== passwordTwo) {
      newErrors.push({ message: 'Passwords do not match.' })
    }

    setErrors(newErrors)

    // Stop here if errors and scroll to top of page
    if (newErrors.length) {
      scrollTo({ offset: 0 })
      return
    }

    // Show alert before changing email
    if (changedEmails.includes('authEmail') && ! forceSubmit) {
      setConfirmAlert('email')
      return
    }

    // Disable form
    setFormDisabled(true)
    // Set loading
    setLoading(true)
    // Update password
    const passwordUpdatePromise = passwordChanged ? firebaseHelpers.doPasswordUpdate(passwordOne) : null
    if (passwordChanged) {
      track('update_account_password')
    }
    // Update user
    const newContactEmail = ! useCustomContactEmail || ! contactEmail ? null : contactEmail
    const userUpdatePromise = accountDetailsChanged ? server.patchUser({ firstName, lastName, email, contactEmail: newContactEmail }) : null
    // When all is done...
    const [userUpdateResponse, passwordChangedRes] = await Promise.all([userUpdatePromise, passwordUpdatePromise])
    const { res: accountChangedRes, error: accountChangedError } = userUpdateResponse || {}
    // Stop form disabled
    setFormDisabled(false)
    // UPDATE USER and emails
    if (accountChangedRes) {
      // Update the user details
      const updatedUser = accountChangedRes
      updateUser(updatedUser)
      setEmail(updatedUser.email)
      setContactEmail(updatedUser.contact_email)
    }
    // Clear the passwords
    setPasswordOne('')
    setPasswordTwo('')
    // Stop loading
    setLoading(false)
    // Handle error in changing password
    if (passwordChangedRes && passwordChangedRes.error) {
      setErrors([...errors, passwordChangedRes.error])
      scrollTo({ offset: 0 })
    }
    if (accountChangedError) {
      setErrors([...errors, accountChangedError])
    }
    // TRACK
    if (changedEmails.includes('email')) {
      track('update_account_email')
    }
    if (changedEmails.includes('contactEmail')) {
      track('update_contact_email')
    }
  }, [contactEmail, email, errors, firstName, formDisabled, initialContactEmail, initialEmail, initialFirstName, initialLastName, lastName, passwordOne, passwordTwo, scrollTo, updateUser, useCustomContactEmail])

  // Set initial values from user
  React.useEffect(() => {
    setFirstName(initialFirstName)
    setLastName(initialLastName)
    setEmail(initialEmail || '')
    setContactEmail(initialContactEmail || '')
  }, [initialFirstName, initialLastName, initialEmail, initialContactEmail])

  // Handle Changes in the form
  const formUpdated = React.useRef(false)
  const handleChange = ({ target }) => {
    formUpdated.current = true
    const { name, value } = target
    if (name === 'firstName') return setFirstName(value)
    if (name === 'lastName') return setLastName(value)
    if (name === 'email') return setEmail(value)
    if (name === 'contactEmail') return setContactEmail(value)
    if (name === 'passwordOne') return setPasswordOne(value)
    if (name === 'passwordTwo') return setPasswordTwo(value)
  }


  // Watch changes in form data and set button
  React.useEffect(() => {
    // Stop here if the form hasn't been updated
    if (! formUpdated.current) return
    // Set the button state
    if (passwordOne !== passwordTwo) {
      setFormDisabled(true)
      return
    }
    if (! firstName || ! lastName || ! email) {
      setFormDisabled(true)
      return
    }
    setFormDisabled(false)
  }, [firstName, lastName, email, contactEmail, passwordOne, passwordTwo])


  return (
    <section>

      {hasPendingEmail && (
        <PendingEmailWarning user={user} className="mb-8" isAccountPage />
      )}

      <form
        className={[
          'md:max-w-xl',
        ].join(' ')}
        onSubmit={onSubmit}
      >

        {errors.map((error, index) => {
          return <Error error={error} key={index} />
        })}

        <ReferralCodeWidget
          label="My referral code"
          className="mb-5"
        />

        <Input
          name="firstName"
          label="Name"
          placeholder=""
          value={firstName}
          handleChange={handleChange}
          type="text"
          disabled={loading}
        />

        <Input
          name="lastName"
          label="Surname"
          placeholder=""
          value={lastName}
          handleChange={handleChange}
          type="text"
          disabled={loading}
        />

        <AccountPageDetailsEmail
          email={email}
          contactEmail={contactEmail}
          hasEmailAuth={hasEmailAuth}
          useCustomContactEmail={useCustomContactEmail}
          setUseCustomContactEmail={setUseCustomContactEmail}
          handleChange={handleChange}
          loading={loading}
        />

        {/* PASSWORD */}
        {hasEmailAuth && (
          <>
            <Input
              name="passwordOne"
              label="New password"
              placeholder=""
              value={passwordOne}
              handleChange={handleChange}
              type="password"
              disabled={loading}
            />

            <Input
              name="passwordTwo"
              label="Confirm new password:"
              placeholder=""
              type="password"
              value={passwordTwo}
              handleChange={handleChange}
              disabled={loading}
            />
          </>
        )}

        <ButtonNew
          className="w-1/2 mt-10"
          type="submit"
          isDisabled={formDisabled}
          is:oading={loading}
          trackComponentName="AccountPageDetails"
        >
          Save changes
        </ButtonNew>
      </form>

      {/* ALERT (for changing email) */}
      <AccountPageDetailsConfirmAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        resubmitForm={onSubmit}
      />

    </section>
  )
}

export default AccountPageDetails
