import React from 'react'
import ProfileUsersInvite from '@/app/ProfileUsersInvite'
import ProfileUsersList from '@/app/ProfileUsersList'

const ProfileUsers = () => {
  const [hasSentInvite, setHasSentInvite] = React.useState(false)

  return (
    <>
      <h2>Team</h2>
      <ProfileUsersList hasSentInvite={hasSentInvite} />
      <ProfileUsersInvite
        hasSentInvite={hasSentInvite}
        setHasSentInvite={setHasSentInvite}
      />
    </>
  )
}

export default ProfileUsers
