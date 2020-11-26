import React from 'react'
// import PropTypes from 'prop-types'

import BasePage from '@/app/BasePage'

import SignupPage from '@/app/SignupPage'

const headerConfig = {
  text: 'sign up',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
      authPage
    >
      <SignupPage />
    </BasePage>
  )
}

export default Page
