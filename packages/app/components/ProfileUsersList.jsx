import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileUsersListItem from '@/app/ProfileUsersListItem'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import { getPendingProfileInvites, formatProfileUsers } from '@/app/helpers/artistHelpers'

const ProfileUsersList = ({ hasSentInvite }) => {
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [profileUsers, setProfileUsers] = React.useState([])

  const { artist, artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (isLoading || hasSentInvite || !artistId) return
    setIsLoading(true)

    const { res: profileInvites, error } = await getPendingProfileInvites(artistId)
    if (!isMounted) {
      setIsLoading(false)
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setProfileUsers(formatProfileUsers(artist?.users, profileInvites))
    setIsLoading(false)
  }, [hasSentInvite])

  if (isLoading) return <Spinner width={25} className="mb-10" />

  return (
    <div className="mb-10">
      <ul>
        {profileUsers.map(({ id, name, userEmail, status }) => (
          <ProfileUsersListItem key={id} user={name || userEmail} status={status} />
        ))}
      </ul>
      <Error error={error} />
    </div>
  )
}

ProfileUsersList.propTypes = {
  hasSentInvite: PropTypes.bool.isRequired,
}

export default ProfileUsersList
