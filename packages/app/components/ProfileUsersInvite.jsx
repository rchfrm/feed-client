import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileUsersInviteForm from '@/app/ProfileUsersInviteForm'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/controlsPageCopy'

const ProfileUsersInvite = () => {
  const { artist } = React.useContext(ArtistContext)

  return (
    <>
      <h3 className="font-bold">Send an invite</h3>
      <MarkdownText markdown={copy.profileInviteDescription(artist.name)} />
      <ProfileUsersInviteForm />
    </>
  )
}

export default ProfileUsersInvite
