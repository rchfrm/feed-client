import React from 'react'

import BasePage from '@/app/BasePage'
import SignupConfirmEmail from '@/app/SignupVerifyEmail'

const headerConfig = {
  text: 'confirm email',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
    >
      <SignupConfirmEmail isSignupFlow />
    </BasePage>
  )
}

export default Page
