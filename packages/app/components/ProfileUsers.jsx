import React from 'react'
import ProfileUsersInvite from '@/app/ProfileUsersInvite'
import ProfileUsersList from '@/app/ProfileUsersList'

const ProfileUsers = () => {
  return (
    <>
      <h2>Team</h2>
      <ProfileUsersList />
      <ProfileUsersInvite />
    </>
  )
}

export default ProfileUsers
