import React from 'react'
import PropTypes from 'prop-types'

import usePrevious from 'use-previous'

import Error from '@/elements/Error'

import * as server from '@/admin/helpers/adminServer'

const possibleStatuses = {
  trial: { canSet: false },
  active: { canSet: true },
  suspend: { canSet: true },
}

const ArtistStatusButtons = ({ artistId, initialStatus }) => {
  const [status, setStatus] = React.useState(initialStatus)
  const previousStatus = usePrevious(status)
  const [error, setError] = React.useState(null)
  const buttonsArray = Object.entries(possibleStatuses)

  const updateStatus = React.useCallback(async (artistId, statusType) => {
    setError(null)
    setStatus(statusType)
    const updatedArtist = await server.updateArtistStatus(artistId, statusType)
      .catch((error) => {
        setError(error)
      })
    // Handle error
    if (!updatedArtist) {
      setStatus(previousStatus)
      return
    }
    const { status: updatedStatus } = updatedArtist
    setStatus(updatedStatus)
  }, [setStatus, previousStatus])

  return (
    <div>
      <p><strong>Artist Status</strong></p>
      <ul className="flex">
        {buttonsArray.map(([statusType, { canSet }]) => {
          const active = statusType === status
          const bgClass = active ? 'bg-green' : 'bg-grey-1'
          const ElType = canSet ? 'button' : 'span'
          return (
            <li key={statusType} className={['mr-5'].join(' ')}>
              <ElType
                className={['button--filter', bgClass].join(' ')}
                onClick={() => updateStatus(artistId, statusType)}
              >
                {statusType}
              </ElType>
            </li>
          )
        })}
      </ul>
      <Error error={error} />
    </div>
  )
}

ArtistStatusButtons.propTypes = {
  artistId: PropTypes.string.isRequired,
  initialStatus: PropTypes.string.isRequired,
}

export default ArtistStatusButtons
