import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import { sendProfileInvite } from '@/app/helpers/artistHelpers'

const ProfileUsersInviteForm = ({ setHasSentInvite }) => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    const { error } = await sendProfileInvite(artistId, email)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setHasSentInvite(true)
    setError(null)
  }

  return (
    <form onSubmit={onSubmit}>
      <Error error={error} />
      <Input
        name="email"
        type="email"
        value={email}
        updateValue={setEmail}
        placeholder="Email address"
        required
      />
      <Button
        version="black"
        disabled={! email}
        onClick={onSubmit}
        loading={isLoading}
        trackComponentName="ProfileUsersInviteForm"
        className="w-full"
      >
        Send
      </Button>
    </form>
  )
}

ProfileUsersInviteForm.propTypes = {
  setHasSentInvite: PropTypes.func.isRequired,
}

export default ProfileUsersInviteForm
