import React from 'react'
import PropTypes from 'prop-types'

import usePrevious from 'use-previous'

import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as server from '@/admin/helpers/adminServer'

const ArtistStatusButton = ({ artistId, initialStatus }) => {
  const [status, setStatus] = React.useState(initialStatus)
  const previousStatus = usePrevious(status)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  // Define button props
  const buttonProps = React.useMemo(() => {
    if (status === 'trial' || status === 'inactive' || status === 'suspend') {
      return {
        text: 'Activate Account',
        action: 'activate',
      }
    }
    if (status === 'active') {
      return {
        text: 'Suspend Account',
        action: 'suspend',
      }
    }
    return { text: '' }
  }, [status])

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
    if (!updatedArtist) {
      setStatus(previousStatus)
      return
    }
    const { status: updatedStatus } = updatedArtist
    setStatus(updatedStatus)
  }, [previousStatus, setError, setLoading])

  return (
    <div>
      <Button
        version="black small"
        loading={loading}
        onClick={() => updateStatus(artistId, buttonProps.action)}
      >
        {buttonProps.text}
      </Button>
      <Error error={error} />
    </div>
  )
}

ArtistStatusButton.propTypes = {
  artistId: PropTypes.string.isRequired,
  initialStatus: PropTypes.string.isRequired,
}

export default ArtistStatusButton
