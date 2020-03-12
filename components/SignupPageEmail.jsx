// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import InputNew from './elements/InputNew'
import Button from './elements/Button'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import Error from './elements/Error'
// IMPORT STYLES
import styles from './SignupPage.module.css'

function SignupPageEmail({ signUpForm, handleChange, isInvalid, error, signup }) {
  const onSubmit = (e) => {
    e.preventDefault()
    signup()
  }

  return (
    <div className="fill-height ninety-wide">

      <form className="four  central" onSubmit={onSubmit}>

        <p>... or sign-up using your email address</p>

        <InputNew
          name="first_name"
          placeholder=""
          value={signUpForm.firstName}
          handleChange={handleChange}
          type="text"
          label="First name"
          version="box"
          required
        />

        <InputNew
          name="last_name"
          placeholder=""
          value={signUpForm.lastName}
          handleChange={handleChange}
          type="text"
          label="Surname"
          version="box"
          required
        />

        <InputNew
          name="email"
          placeholder=""
          value={signUpForm.email}
          handleChange={handleChange}
          type="email"
          label="Email"
          version="box"
          required
        />

        <InputNew
          name="passwordOne"
          placeholder=""
          value={signUpForm.passwordOne}
          handleChange={handleChange}
          type="password"
          label="Password"
          version="box"
          required
        />

        <InputNew
          name="passwordTwo"
          placeholder=""
          value={signUpForm.passwordTwo}
          handleChange={handleChange}
          type="password"
          label="Confirm Password"
          version="box"
          required
        />

        <Error error={error} />

        <div className={styles.signupButton}>
          <Button
            version="black"
            disabled={isInvalid}
            type="sumbit"
          >
            sign up
          </Button>
        </div>

      </form>

    </div>

  )
}

export default SignupPageEmail
