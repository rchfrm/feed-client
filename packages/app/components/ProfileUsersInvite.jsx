import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileUsersInviteForm from '@/app/ProfileUsersInviteForm'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/controlsPageCopy'

const ProfileUsersInvite = ({ hasSentInvite, setHasSentInvite }) => {
  const { artist } = React.useContext(ArtistContext)

  React.useEffect(() => {
    if (!hasSentInvite) return

    const timeout = setTimeout(() => {
      setHasSentInvite(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [hasSentInvite, setHasSentInvite])

  return (
    <>
      <h3 className="font-bold">Send an invite</h3>
      <MarkdownText markdown={copy.profileInviteDescription(artist.name)} />
      {hasSentInvite ? <MarkdownText markdown="Invite sent 🎉" /> : (
        <ProfileUsersInviteForm
          setHasSentInvite={setHasSentInvite}
        />
      )}
    </>
  )
}

ProfileUsersInvite.propTypes = {
  hasSentInvite: PropTypes.bool.isRequired,
  setHasSentInvite: PropTypes.func.isRequired,
}

export default ProfileUsersInvite
