// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Input from './elements/Input'
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

        <Input
          name="first_name"
          placeholder="Name"
          value={signUpForm.firstName}
          onChange={handleChange}
          type="text"
          label="none"
          version="box"
          width="half first"
        />

        <Input
          name="last_name"
          placeholder="Surname"
          value={signUpForm.lastName}
          onChange={handleChange}
          type="text"
          label="none"
          version="box"
          width="half"
        />

        <Input
          name="email"
          placeholder="Email"
          value={signUpForm.email}
          onChange={handleChange}
          type="text"
          label="none"
          version="box"
          width="full"
        />

        <Input
          name="passwordOne"
          placeholder="Password"
          value={signUpForm.passwordOne}
          onChange={handleChange}
          type="password"
          label="none"
          version="box"
          width="full"
        />

        <Input
          name="passwordTwo"
          placeholder="Confirm Password"
          value={signUpForm.passwordTwo}
          onChange={handleChange}
          type="password"
          label="none"
          version="box"
          width="full"
        />

        <Error error={error} />

        <div className={styles.signupButton}>
          <Button
            version="black progress"
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
