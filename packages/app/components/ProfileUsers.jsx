import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileUsersInvite from '@/app/ProfileUsersInvite'
import ProfileUsersList from '@/app/ProfileUsersList'
import DisabledSection from '@/app/DisabledSection'

const ProfileUsers = () => {
  const [hasSentInvite, setHasSentInvite] = React.useState(false)

  const { artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist

  return (
    <div>
      <h2>Team</h2>
      <DisabledSection section="team" isDisabled={!hasSetUpProfile}>
        <ProfileUsersList hasSentInvite={hasSentInvite} />
        <ProfileUsersInvite
          hasSentInvite={hasSentInvite}
          setHasSentInvite={setHasSentInvite}
        />
      </DisabledSection>
    </div>
  )
}

export default ProfileUsers
