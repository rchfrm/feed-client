import React from 'react'

import { useRouter } from 'next/router'

import PostContent from '@/app/PostContent'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

const headerConfig = {
  text: 'post',
}

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      controlsRequired
    >
      <PostContent postId={id} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
