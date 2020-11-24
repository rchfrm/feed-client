import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import NotificationsContent from '@/app/NotificationsContent'

const headerConfig = {
  text: 'notifications',
}

const Page = () => {
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      staticPage
    >
      <NotificationsContent />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
