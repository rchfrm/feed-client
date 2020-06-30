import React from 'react'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import AllUsersLoader from '@/admin/AllUsersLoader'

const Users = () => {
  return (
    <BasePage
      headerConfig="tournamenmts"
      staticPage
    >
      <AllUsersLoader />
    </BasePage>
  )
}

export default testPageReady('admin')(Users)
