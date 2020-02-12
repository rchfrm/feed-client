
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
import Loading from './elements/Loading'
import Input from './elements/Input'
import Button from './elements/Button'
import Error from './elements/Error'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
import firebase from './helpers/firebase'
// IMPORT STYLES
import styles from './AccountPage.module.css'

function Details() {
// DEFINE LOCAL STATE
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwordOne, setPasswordOne] = React.useState('')
  const [passwordTwo, setPasswordTwo] = React.useState('')
  // END DEFINE LOCAL STATE

  // DEFINE ERROR
  const [error, setError] = React.useState(null)
  // END DEFINE ERROR

  // SET INITIAL LOCAL STATE BASED ON USER STATE SENT THROUGH PROPS
  const { user, setUser, userLoading, verifyToken } = React.useContext(UserContext)
  React.useEffect(() => {
    if (user.first_name && user.last_name && user.email) {
      setName(user.first_name)
      setSurname(user.last_name)
      setEmail(user.email)
    }
  }, [user.first_name, user.last_name, user.email])
  // END SET INITIAL LOCAL STATE BASED ON USER STATE SENT THROUGH PROPS

  // DEFINE BUTTON STATE
  const initialButtonState = {
    disabled: false,
    text: 'save changes',
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
          text: 'saved',
        }
      case 'reset':
        return initialButtonState
      default:
        throw new Error(`Unable to find ${buttonAction.type} in buttonReducer`)
    }
  }
  const [button, setButton] = React.useReducer(buttonReducer, initialButtonState)
  // END DEFINE BUTTON STATE

  // TRACK CHANGES IN FORM
  React.useEffect(() => {
    const changed = (
      name !== user.first_name
      || surname !== user.last_name
      || email !== user.email
      || passwordOne !== ''
      || passwordTwo !== ''
    )

    if (changed) {
      setButton({ type: 'abled' })
    } else {
      setButton({ type: 'disabled' })
    }
  }, [name, user.first_name, surname, user.last_name, email, user.email, passwordOne, passwordTwo])
  // END TRACK CHANGES IN FORM

  const handleChange = e => {
    setError(null)
    setButton({ type: 'reset' })
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        break
      case 'surname':
        setSurname(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'passwordOne':
        setPasswordOne(e.target.value)
        break
      case 'passwordTwo':
        setPasswordTwo(e.target.value)
        break
      default:
        break
    }
  }

  const handleClick = e => {
    const saveChanges = async () => {
      if (name !== user.first_name || surname !== user.last_name || email !== user.email) {
        try {
          // TODO : Move this function to user state ?
          const updatedUser = await server.updateUser(name, surname, email, verifyToken)
          if (email !== user.email) {
            await firebase.doEmailUpdate(email)
          }
          if (Object.keys(updatedUser.artists).length > 0) {
            updatedUser.artists = helper.sortArtistsAlphabetically(user.artists)
          }
          setUser({
            type: 'set-user',
            payload: {
              user: updatedUser,
            },
          })
        } catch (err) {
          setError(err)
        }
      }
      if (passwordOne && passwordOne === passwordTwo) {
        try {
          await firebase.doPasswordUpdate(passwordOne)
          setPasswordOne('')
          setPasswordTwo('')
        } catch (err) {
          setError(err)
        }
      }
      setButton({ type: 'saved' })
    }
    if (passwordOne !== passwordTwo) {
      setError({ message: 'Passwords do not match' })
    } else if (name === '' || surname === '') {
      setError({ message: 'Name or surname can not be empty' })
    } else if (email === '') {
      setError({ message: 'An email address is needed' })
    } else {
      setButton({ type: 'saving' })
      saveChanges()
    }

    e.preventDefault()
  }

  // HANDLE DELETE ACCOUNT
  const deleteAccount = e => {
    e.preventDefault()
    // eslint-disable-next-line
    window.alert('To delete your Feed account, please contact us at services@archform.ltd')
  }
  // END HANDLE DELETE ACCOUNT

  return (
    <div className={styles['account-details']}>
      <h2 className={styles.h2}>Account Details</h2>

      {userLoading
        ? <Loading what="account details" noPadding />
        : (
          <div
            style={{
              width: '100%',
            }}
          >
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

            <div className="flex-row">

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

          </div>
        )}

      <Button version="black progress" onClick={handleClick} disabled={button.disabled}>{button.text}</Button>

      <Error error={error} />

      <Button
        version="text"
        width={100}
        textAlign="left"
        onClick={deleteAccount}
      >
        Delete account
      </Button>

    </div>
  )
}

export default Details
