import React from 'react'
// import PropTypes from 'prop-types'

import BasePage from '@/app/BasePage'
import SignupFacebookEmail from '@/app/SignupFacebookEmail'

const headerConfig = {
  text: 'confirm email',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
      authPage
    >
      <SignupFacebookEmail />
    </BasePage>
  )
}

export default Page
