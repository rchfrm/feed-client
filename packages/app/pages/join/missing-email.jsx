import React from 'react'
// import PropTypes from 'prop-types'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import SignupMissingEmail from '@/app/SignupMissingEmail'

const headerConfig = {
  text: 'confirm email',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      authPage
      staticPage
    >
      <SignupMissingEmail />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
