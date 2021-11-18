import React from 'react'

import BasePage from '@/app/BasePage'
import ConfirmEmailPage from '@/app/ConfirmEmailPage'

const headerConfig = {
  text: 'confirm email',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
    >
      <ConfirmEmailPage />
    </BasePage>
  )
}

export default Page
