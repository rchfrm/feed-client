import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import * as server from '@/admin/helpers/adminServer'

const ArtistActivationStatusButton = ({ artistId, artistStatus, setArtistsStatus }) => {
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  // Define button props
  const buttonProps = React.useMemo(() => {
    if (artistStatus === 'trial' || artistStatus === 'inactive' || artistStatus === 'suspend') {
      return {
        text: 'Activate Account',
        action: 'activate',
      }
    }
    if (artistStatus === 'active') {
      return {
        text: 'Suspend Account',
        action: 'suspend',
      }
    }
    return { text: '' }
  }, [artistStatus])

  const updateStatus = React.useCallback(async (artistId, statusType) => {
    setError(null)
    setLoading(true)
    const updatedArtist = await server.updateArtistStatus(artistId, statusType)
      .catch((error) => {
        setError(error)
      })
    // Turn off loading
    setLoading(false)
    // Handle error
    if (!updatedArtist) return
    const { status: updatedStatus } = updatedArtist
    setArtistsStatus(updatedStatus)
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Button
        version="black small"
        loading={loading}
        onClick={() => updateStatus(artistId, buttonProps.action)}
        trackComponentName="ArtistActivationStatusButton"
      >
        {buttonProps.text}
      </Button>
      <Error error={error} />
    </div>
  )
}

ArtistActivationStatusButton.propTypes = {
  artistId: PropTypes.string.isRequired,
  artistStatus: PropTypes.string.isRequired,
  setArtistsStatus: PropTypes.func.isRequired,
}

export default ArtistActivationStatusButton
