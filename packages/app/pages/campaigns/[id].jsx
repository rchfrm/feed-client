import React from 'react'
import { useRouter } from 'next/router'
import BasePage from '@/app/BasePage'
import Campaign from '@/app/Campaign'
import testPageReady from '@/hoc/testPageReady'

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <BasePage
      headerConfig={{ text: '' }}
      artistRequired
      controlsRequired
      hasNoProfilesPage
    >
      <Campaign id={id} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
