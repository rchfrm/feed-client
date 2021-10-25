import React from 'react'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import UsersLoader from '@/admin/UsersLoader'

const Users = () => {
  return (
    <BasePage
      header="users"
      staticPage
    >
      <UsersLoader />
    </BasePage>
  )
}

export default testPageReady('admin')(Users)
