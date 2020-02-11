// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Form from './elements/Form'
import Input from './elements/Input'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import Error from './elements/Error'
// IMPORT STYLES

function SignupPageEmail({ signUpForm, handleChange, error }) {
  return (
    <div className="fill-height ninety-wide">

      <Form width="four" position="central">

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

      </Form>

    </div>

  )
}

export default SignupPageEmail
