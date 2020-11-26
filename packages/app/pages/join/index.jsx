import React from 'react'
// import PropTypes from 'prop-types'

import BasePage from '@/app/BasePage'
import SignupPageContent from '@/app/SignupPageContent'
import SignupClosedContent from '@/app/SignupClosedContent'

const headerConfig = {
  text: 'sign up',
}

const requireReferralCode = true

const Page = () => {
  const [hasReferralCode, setHasReferralCode] = React.useState(false)
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
      authPage
    >
      {hasReferralCode || !requireReferralCode ? (
        <SignupPageContent requireReferralCode={requireReferralCode} />
      ) : (
        <SignupClosedContent />
      )}
    </BasePage>
  )
}

export default Page
