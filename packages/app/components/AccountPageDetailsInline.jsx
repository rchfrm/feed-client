import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import * as server from '@/helpers/sharedServer'
import firebase from '@/helpers/firebase'
import { track } from '@/app/helpers/trackingHelpers'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import styles from '@/app/AccountPage.module.css'


function AccountPageDetailsInline({ user }) {
  // Get user context
  const { updateUser } = React.useContext(UserContext)
  // Determine if user uses FB auth
  const { auth: { providerIds } } = React.useContext(AuthContext)
  const facebookAuth = providerIds.includes('facebook.com')
  // Get initial details from user
  const { first_name: initialName, last_name: initialSurname, email: initialEmail } = user

  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwordOne, setPasswordOne] = React.useState('')
  const [passwordTwo, setPasswordTwo] = React.useState('')
  const [buttonOn, setButtonOn] = React.useState(false)

  // SUBMIT THE FORM
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState([])
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    // Clear errors
    let error = false
    setErrors([])
    const passwordChanged = passwordOne || passwordTwo
    const emailChanged = email !== initialEmail
    const accountDetailsChanged = (initialName !== name) || (initialSurname !== surname) || emailChanged

    // No name
    if (!name || !surname) {
      setErrors([...errors, { message: 'Please provide a name and surname.' }])
      error = true
    }

    // No email
    if (!email) {
      setErrors([...errors, { message: 'Please provide an email.' }])
      error = true
    }

    // If not matching passwords
    if (passwordChanged && passwordOne !== passwordTwo) {
      setErrors([...errors, { message: 'Passwords do not match.' }])
      error = true
    }

    // Stop here if errors
    if (error) return
    // Hide button
    setButtonOn(false)
    // Set loading
    setLoading(true)
    // Update password
    const passwordUpdatePromise = passwordChanged ? firebase.doPasswordUpdate(passwordOne) : null
    // Update email in firebase
    const emailChangedRes = emailChanged ? await firebase.doEmailUpdate(email) : null
    // Handle error in changing email
    if (emailChangedRes && emailChangedRes.error) {
      setErrors([...errors, emailChangedRes.error])
      error = true
      setLoading(false)
      return
    }
    // TRACK
    if (emailChanged) {
      track({
        category: 'Account Page',
        action: 'Update email address',
        label: `User ID: ${user.id}`,
      })
    }
    if (passwordChanged) {
      track({
        category: 'Account Page',
        action: 'Update password',
        label: `User ID: ${user.id}`,
      })
    }
    // Update user
    const userUpdatePromise = accountDetailsChanged ? server.updateUser(name, surname, email) : null
    // When all is done...
    const [accountChangedRes, passwordChangedRes] = await Promise.all([userUpdatePromise, passwordUpdatePromise])
    if (accountChangedRes) {
      // Update the user details
      const updatedUser = accountChangedRes
      updateUser(updatedUser)
    }
    // Clear the passwords
    setPasswordOne('')
    setPasswordTwo('')
    // Stop loading
    setLoading(false)
    // Handle error in changing password
    if (passwordChangedRes && passwordChangedRes.error) {
      setErrors([...errors, passwordChangedRes.error])
      error = true
    }
  }


  // Set initial values from user
  React.useEffect(() => {
    setName(initialName)
    setSurname(initialSurname)
    setEmail(initialEmail)
  }, [initialName, initialEmail, initialSurname])

  // Handle Changes in the form
  const formUpdated = React.useRef(false)
  const handleChange = ({ target }) => {
    formUpdated.current = true
    const { name, value } = target
    if (name === 'name') return setName(value)
    if (name === 'surname') return setSurname(value)
    if (name === 'email') return setEmail(value)
    if (name === 'passwordOne') return setPasswordOne(value)
    if (name === 'passwordTwo') return setPasswordTwo(value)
  }


  // Watch changes in form data and set button
  React.useEffect(() => {
    // Stop here if the form hasn't been updated
    if (!formUpdated.current) return
    // Set the button state
    if (passwordOne !== passwordTwo) {
      setButtonOn(false)
      return
    }
    if (!name || !surname || !email) {
      setButtonOn(false)
      return
    }
    setButtonOn(true)
  }, [name, email, surname, passwordOne, passwordTwo])


  return (
    <section className={styles.accountPageDetails}>

      {/* <h2 className={sidePanelStyles.SidePanel__Header}>Account Page Details</h2> */}

      <form className={styles.accountPageDetails__form} onSubmit={handleSubmit}>

        {errors.map((error, index) => {
          return <Error error={error} key={index} />
        })}

        <Input
          name="name"
          label="Name"
          placeholder=""
          value={name}
          handleChange={handleChange}
          type="text"
          disabled={loading}
        />

        <Input
          name="surname"
          label="Surname"
          placeholder=""
          value={surname}
          handleChange={handleChange}
          type="text"
          disabled={loading}
        />

        <Input
          name="email"
          label="Email"
          tooltipMessage={facebookAuth ? 'This is where you will receive important notifications from Feed.' : ''}
          placeholder=""
          value={email}
          handleChange={handleChange}
          type="email"
          disabled={loading}
        />

        {!facebookAuth && (
          <>
            <Input
              name="passwordOne"
              label="Password"
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

        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!buttonOn}
          loading={loading}
        >
          Save changes
        </Button>
      </form>
    </section>
  )
}

AccountPageDetailsInline.propTypes = {
  user: PropTypes.object.isRequired,
}

export default AccountPageDetailsInline
