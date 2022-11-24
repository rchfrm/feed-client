import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ProfileUsersInviteAccepted from '@/app/ProfileUsersInviteAccepted'

const Page = () => {
  const { artist } = React.useContext(ArtistContext)

  const headerConfig = {
    text: `join ${artist.name}`,
  }

  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
    >
      <ProfileUsersInviteAccepted />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
