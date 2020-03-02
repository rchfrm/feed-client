import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'

import helper from './helpers/helper'
import server from './helpers/server'
import firebase from './helpers/firebase'

import Input from './elements/Input'
import Button from './elements/Button'

import styles from './AccountPage.module.css'

function AccountPageDetailsNew({ user, closePanel }) {
  // Get user and auth context
  const { getToken } = React.useContext(AuthContext)
  const { setUser } = React.useContext(UserContext)
  const { first_name: userName, last_name: userSurname, email: userEmail } = user

  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwordOne, setPasswordOne] = React.useState('')
  const [passwordTwo, setPasswordTwo] = React.useState('')

  // DEFINE BUTTON STATE
  const initialButtonState = {
    disabled: false,
    text: 'save changes',
    success: false,
  }

  const buttonReducer = (buttonState, buttonAction) => {
    switch (buttonAction.type) {
      case 'abled':
        return {
          ...buttonState,
          disabled: false,
        }
      case 'disabled':
        return {
          ...buttonState,
          disabled: true,
        }
      case 'saving':
        return {
          ...buttonState,
          disabled: true,
          text: 'saving...',
        }
      case 'saved':
        return {
          ...buttonState,
          disabled: true,
          success: true,
          text: 'saved!',
        }
      case 'reset':
        return initialButtonState
      default:
        throw new Error(`Unable to find ${buttonAction.type} in buttonReducer`)
    }
  }

  const [button, setButton] = React.useReducer(buttonReducer, initialButtonState)

  // Set initial values from user
  React.useEffect(() => {
    setName(userName)
    setSurname(userSurname)
    setEmail(userEmail)
  }, [])

  // Handle Changes in the form
  const formUpdated = React.useRef(false)
  const handleChange = ({ target }) => {
    formUpdated.current = true
    const { name, value } = target
    if (name === 'name') return setName(value)
    if (name === 'surname') return setSurname(value)
    if (name === 'passwordOne') return setPasswordOne(value)
    if (name === 'passwordTwo') return setPasswordTwo(value)
  }

  // Watch changes in form data and set button
  React.useEffect(() => {
    // Stop here if the form hasn't been updated
    if (!formUpdated.current) return
    // Set the button state
    if (passwordOne !== passwordTwo) {
      setButton({ type: 'disabled' })
      return
    }
    if (!name || !surname || !email) {
      setButton({ type: 'disabled' })
      return
    }
    setButton({ type: 'abled' })
  }, [name, surname, passwordOne, passwordTwo])

  // Submit the form
  const [errors, setErrors] = React.useState([])
  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault()
    const passwordChanged = passwordOne || passwordTwo
    // No password set and no name changes, close panel
    if (!passwordChanged && name === userName && surname === userSurname && email === userEmail) {
      closePanel()
      return
    }

    // No name
    if (!name || !surname) {
      setErrors([...errors, 'Please provide a name and surname.'])
    }

    // No email
    if (!email) {
      setErrors([...errors, 'Please provide an email.'])
    }

    // If not matching passwords
    if (passwordChanged && passwordOne !== passwordTwo) {
      setErrors([...errors, 'Passwords do not match.'])
    }

    // Stop here if errors
    if (errors.length) return
    // Now we wait...
    setButton({ type: 'saving' })
    // Update password
    const passwordUpdatePromise = passwordChanged ? firebase.doPasswordUpdate(passwordOne) : null
    // Update user
    const token = await getToken()
    const userUpdatePromise = server.updateUser(name, surname, email, token)
    // When all is done...
    const res = await Promise.all([userUpdatePromise, passwordUpdatePromise])
      .catch((err) => console.log('err', err))
    if (!res) return
    // Update the user details
    const [updatedUser] = res
    setUser({
      type: 'set-user-details',
      payload: {
        user: updatedUser,
      },
    })
    // Clear the passwords
    setPasswordOne('')
    setPasswordTwo('')
    // Show success message
    setButton({ type: 'saved' })
    // Close the sidebar after three seconds
    setTimeout(() => {
      closePanel()
    }, 3000)
  }

  return (
    <section className={styles.accountPageDetails}>

      <h2 className={styles.accountPageDetails__header}>Account Page Details</h2>

      <form className={styles.accountPageDetails__form} onSubmit={handleSubmit}>

        <div className={`flex-row ${styles.row}`}>

          <Input
            className={styles.input}
            name="name"
            placeholder=""
            value={name}
            onChange={handleChange}
            type="text"
            label={{
              position: 'top',
              text: 'Name:',
              icon: null,
            }}
            width={48.611}
            version="text"
          />

          <Input
            className={styles.input}
            name="surname"
            placeholder=""
            value={surname}
            onChange={handleChange}
            type="text"
            label={{
              position: 'top',
              text: 'Surname:',
              icon: null,
            }}
            version="text"
            width={48.611}
          />

        </div>

        <div className={`flex-row ${styles.row}`}>
          <Input
            className={styles.input}
            name="email"
            placeholder=""
            value={email}
            onChange={handleChange}
            type="email"
            label={{
              position: 'top',
              text: 'Email:',
              icon: null,
            }}
            version="text"
            width="full"
          />
        </div>


        <div className={`flex-row ${styles.row}`}>

          <Input
            className={styles.input}
            name="passwordOne"
            placeholder=""
            value={passwordOne}
            onChange={handleChange}
            type="password"
            label={{
              position: 'top',
              text: 'New password:',
              icon: null,
            }}
            version="text"
            width={48.611}
          />

          <Input
            className={styles.input}
            name="passwordTwo"
            placeholder=""
            value={passwordTwo}
            onChange={handleChange}
            type="password"
            label={{
              position: 'top',
              text: 'Confirm new password:',
              icon: null,
            }}
            version="text"
            width={48.611}
          />
        </div>

        <Button
          className={styles.submitButton}
          version="black"
          type="submit"
          disabled={button.disabled}
          success={button.success}
        >
          {button.text}
        </Button>
      </form>
    </section>
  )
}

AccountPageDetailsNew.propTypes = {
  user: PropTypes.object.isRequired,
  closePanel: PropTypes.func.isRequired,
}

export default AccountPageDetailsNew
