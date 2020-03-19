// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import Error from '../elements/Error'
// IMPORT PAGES
import SignupPageFacebook from '../SignupPageFacebook'
import SignupPageEmail from '../SignupPageEmail'
import LoginPageLink from '../LoginPageLink'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
// IMPORT HELPERS
import Spinner from '../elements/Spinner'
import brandColors from '../../constants/brandColors'
// IMPORT STYLES

// Define initial state and reducer of form
const initialSignUpFormState = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
}

const signUpFormReducer = (signUpState, signUpAction) => {
  switch (signUpAction.type) {
    case 'firstName':
      return {
        ...signUpState,
        firstName: signUpAction.payload.firstName,
      }
    case 'lastName':
      return {
        ...signUpState,
        lastName: signUpAction.payload.lastName,
      }
    case 'email':
      return {
        ...signUpState,
        email: signUpAction.payload.email,
      }
    case 'name-email':
      return {
        ...signUpState,
        firstName: signUpAction.payload.firstName,
        lastName: signUpAction.payload.lastName,
        email: signUpAction.payload.email,
      }
    case 'passwordOne':
      return {
        ...signUpState,
        passwordOne: signUpAction.payload.passwordOne,
      }
    case 'passwordTwo':
      return {
        ...signUpState,
        passwordTwo: signUpAction.payload.passwordTwo,
      }
    default:
      throw new Error(`Unable to find ${signUpAction.type} in signUpFormReducer`)
  }
}

function SignupPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  // IMPORT CONTEXTS
  const { authLoading, signUp } = React.useContext(AuthContext)
  const { createUser, user, userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE FORM FIELD STATES
  const [signUpForm, setSignUpForm] = React.useReducer(signUpFormReducer, initialSignUpFormState)
  const [redirecting, setRedirecting] = React.useState(false)
  const [error, setError] = React.useState('')
  // END DEFINE FORM FIELD STATES

  // DEFINE ISINVALID
  const isInvalid = (
    signUpForm.passwordOne !== signUpForm.passwordTwo
    || signUpForm.passwordOne === ''
    || signUpForm.email === ''
    || user.first_name === ''
    || user.last_name === ''
  )
  // END DEFINE ISINVALID

  // HANDLE CHANGES IN FORM
  const handleChange = e => {
    setError('')
    switch (e.target.name) {
      case 'first_name':
        setSignUpForm({
          type: 'firstName',
          payload: {
            firstName: e.target.value,
          },
        })
        break
      case 'last_name':
        setSignUpForm({
          type: 'lastName',
          payload: {
            lastName: e.target.value,
          },
        })
        break
      case 'email':
        setSignUpForm({
          type: 'email',
          payload: {
            email: e.target.value,
          },
        })
        break
      case 'passwordOne':
        setSignUpForm({
          type: 'passwordOne',
          payload: {
            passwordOne: e.target.value,
          },
        })
        break
      case 'passwordTwo':
        setSignUpForm({
          type: 'passwordTwo',
          payload: {
            passwordTwo: e.target.value,
          },
        })
        break
      default:
        break
    }
  }
  // END HANDLE CHANGES IN FORM

  // HANDLE CLICK ON SIGN-UP BUTTON
  const signup = async () => {
    await signUp(signUpForm.email, signUpForm.passwordOne)
      .catch((error) => {
        setError(error)
      })
    await createUser(signUpForm.firstName, signUpForm.lastName)
      .catch((error) => {
        setError(error)
      })
    setRedirecting(true)
    Router.push(ROUTES.CONNECT_ARTIST)
  }
  // END HANDLE CLICK ON SIGN-UP BUTTON

  if (authLoading || userLoading || artistLoading || redirecting) {
    return <Spinner width={50} color={brandColors.green} />
  }
  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="sign up" />
      <LoginPageLink />
      <p
        className="ninety-wide"
        style={{ marginBottom: '3em' }}
      >
        By clicking sign up, you agree to our
        {' '}
        <a href="https://archform.ltd/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        {' '}
        and
        {' '}
        <a href="https://archform.ltd/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        .
      </p>

      <SignupPageFacebook
        setError={setError}
      />

      <SignupPageEmail
        signUpForm={signUpForm}
        setSignUpForm={setSignUpForm}
        error={error}
        handleChange={handleChange}
        signup={signup}
        isInvalid={isInvalid}
      />

    </div>
  )
}


export default SignupPage
