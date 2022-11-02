import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileUsersListItem from '@/app/ProfileUsersListItem'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import { getProfileInvites } from '@/app/helpers/artistHelpers'

const ProfileUsersList = () => {
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [profileInvites, setProfileInvites] = React.useState([])

  const { artist, artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (isLoading) return
    setIsLoading(true)

    const { res, error } = await getProfileInvites(artistId)
    if (!isMounted) {
      setIsLoading(false)
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setProfileInvites(res)
    setIsLoading(false)
  }, [])

  if (isLoading) return <Spinner width={25} className="mb-10" />

  return (
    <div className="mb-10">
      <ul>
        {Object.values(artist?.users).map(({ id, name, role }) => (
          <ProfileUsersListItem key={id} user={name} status={role} />
        ))}
        {profileInvites.map(({ id, userEmail, status }) => (
          <ProfileUsersListItem key={id} user={userEmail} status={status} />
        ))}
      </ul>
      <Error error={error} />
    </div>
  )
}

export default ProfileUsersList
