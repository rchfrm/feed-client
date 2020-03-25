import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from './contexts/User'
import { SidePanelContext } from './contexts/SidePanelContext'

import server from './helpers/server'
import firebase from './helpers/firebase'

import InputNew from './elements/InputNew'
import Button from './elements/Button'

import styles from './AccountPage.module.css'
import sidePanelStyles from './SidePanel.module.css'


const getButton = (buttonOn, handleSubmit) => {
  return (
    <Button version="green" onClick={handleSubmit} disabled={!buttonOn}>
      Save changes
    </Button>
  )
}

function AccountPageDetails({ user }) {
  // Get user context
  const { setUser } = React.useContext(UserContext)
  // Get Side panel context
  const {
    toggleSidePanel,
    setSidePanelLoading,
    setSidePanelButton,
  } = React.useContext(SidePanelContext)
  // Get initial details from user
  const { first_name: initialName, last_name: initialSurname, email: initialEmail } = user

  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwordOne, setPasswordOne] = React.useState('')
  const [passwordTwo, setPasswordTwo] = React.useState('')
  const [buttonOn, setButtonOn] = React.useState(true)

  // SUBMIT THE FORM
  const [errors, setErrors] = React.useState([])
  const handleSubmit = React.useRef(() => {})
  handleSubmit.current = async (e) => {
    if (e) e.preventDefault()
    // Clear errors
    setErrors([])
    const passwordChanged = passwordOne || passwordTwo
    // No password set and no name changes, close panel
    if (!passwordChanged && name === initialName && surname === initialSurname && email === initialEmail) {
      toggleSidePanel()
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
    // Hide button
    setButtonOn(false)
    // Set loading
    setSidePanelLoading(true)
    // Update password
    const passwordUpdatePromise = passwordChanged ? firebase.doPasswordUpdate(passwordOne) : null
    // Update user
    const userUpdatePromise = server.updateUser(name, surname, email)
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
    // Stop loading
    setSidePanelLoading(false)
    // Close panel after delay
    setTimeout(toggleSidePanel, 1500)
  }


  // Set initial values from user
  React.useEffect(() => {
    setName(initialName)
    setSurname(initialSurname)
    setEmail(initialEmail)
  }, [])

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


  // UPDATE BUTTON
  // const [, updateState] = React.useState()
  // const forceUpdate = React.useCallback(() => updateState({}), [])
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  React.useEffect(() => {
    const submit = () => {
      forceUpdate()
      handleSubmit.current()
    }
    setSidePanelButton(getButton(buttonOn, submit))
    return () => {
      setSidePanelButton(null)
    }
  }, [buttonOn])

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
  }, [name, surname, passwordOne, passwordTwo])


  return (
    <section className={styles.accountPageDetails}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Account Page Details</h2>

      <form className={styles.accountPageDetails__form} onSubmit={handleSubmit.current}>

        <InputNew
          name="name"
          label="Name"
          placeholder=""
          value={name}
          handleChange={handleChange}
          type="text"
          version="text"
        />

        <InputNew
          name="surname"
          label="Surname"
          placeholder=""
          value={surname}
          handleChange={handleChange}
          type="text"
          version="text"
        />

        <InputNew
          name="email"
          label="Email"
          placeholder=""
          value={email}
          handleChange={handleChange}
          type="email"
          version="text"
        />

        <InputNew
          name="passwordOne"
          label="Password"
          placeholder=""
          value={passwordOne}
          handleChange={handleChange}
          type="password"
          version="text"
        />

        <InputNew
          name="passwordTwo"
          label="Confirm new password:"
          placeholder=""
          type="password"
          value={passwordTwo}
          handleChange={handleChange}
          version="text"
        />
      </form>
    </section>
  )
}

AccountPageDetails.propTypes = {
  user: PropTypes.object.isRequired,
}

export default AccountPageDetails
