import React from 'react'
import PageIntro from '@/admin/elements/PageIntro'
import AllUsersLoader from '@/admin/AllUsersLoader'

export default function Home() {
  return (
    <div>
      <PageIntro />
      <AllUsersLoader />
    </div>
  )
}
