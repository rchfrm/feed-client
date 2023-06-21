import React from 'react'
import BasePage from '@/app/BasePage'
import CampaignsLoader from '@/app/CampaignsLoader'
import testPageReady from '@/hoc/testPageReady'

const headerConfig = {
  text: 'campaigns',
}

const Page = () => {
  return (
    <BasePage headerConfig={headerConfig}>
      <CampaignsLoader />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
