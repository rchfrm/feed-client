import React from 'react'

import BasePage from '@/app/BasePage'
import SignupAddReferralCode from '@/app/SignupAddReferralCode'

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
      <SignupAddReferralCode />
    </BasePage>
  )
}

export default Page
