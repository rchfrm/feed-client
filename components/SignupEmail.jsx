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

function SignUpForm(props) {
  return (
    <div className="fill-height ninety-wide">

      <Form width="four" position="central">

        <p>... or sign-up using your email address</p>

        <Input
          name="first_name"
          placeholder="Name"
          value={props.signUpForm.firstName}
          onChange={props.handleChange}
          type="text"
          label="none"
          version="box"
          width="half first"
        />

        <Input
          name="last_name"
          placeholder="Surname"
          value={props.signUpForm.lastName}
          onChange={props.handleChange}
          type="text"
          label="none"
          version="box"
          width="half"
        />

        <Input
          name="email"
          placeholder="Email"
          value={props.signUpForm.email}
          onChange={props.handleChange}
          type="text"
          label="none"
          version="box"
          width="full"
        />

        <Input
          name="passwordOne"
          placeholder="Password"
          value={props.signUpForm.passwordOne}
          onChange={props.handleChange}
          type="password"
          label="none"
          version="box"
          width="full"
        />

        <Input
          name="passwordTwo"
          placeholder="Confirm Password"
          value={props.signUpForm.passwordTwo}
          onChange={props.handleChange}
          type="password"
          label="none"
          version="box"
          width="full"
        />

        <Error error={props.error} />

      </Form>

    </div>

  )
}

export default SignUpForm
