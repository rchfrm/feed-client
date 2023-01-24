import React from 'react'
import { useRouter } from 'next/router'
import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ControlsContent from '@/app/ControlsContent'

const headerConfig = {
  text: 'controls',
}

const Page = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      controlsRequired
      hasNoProfilesPage
    >
      <ControlsContent slug={slug} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
