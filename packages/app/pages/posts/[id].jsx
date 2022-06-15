import React from 'react'

import { useRouter } from 'next/router'

import PostLoader from '@/app/PostLoader'

import BasePage from '@/app/BasePage'
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
      <PostLoader postId={id} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
