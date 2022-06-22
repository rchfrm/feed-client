import Button from '@/elements/Button'
import Error from '@/elements/Error'
import React from 'react'
import * as server from '@/admin/helpers/adminServer'
import { patchArtistCampaignStatus } from '@/admin/helpers/adminServer'

export default function ArtistCampaignStatusButton({ artistId, artistStatus, setArtistStatus }) {
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  // Define button props
  const buttonProps = React.useMemo(() => {
    if (artistStatus === 0) {
      return {
        text: 'Resume ads',
        newStatus: 1,
      }
    }
    return {
      text: 'Pause ads',
      newStatus: 0,
    }
  }, [artistStatus])
  const updateStatus = React.useCallback(async (artistId, campaignStatus) => {
    setError(null)
    setLoading(true)
    const updatedArtist = await server.patchArtistCampaignStatus(artistId, campaignStatus)
      .catch((error) => {
        setError(error)
      })
    // Turn off loading
    setLoading(false)
    // Handle error
    if (!updatedArtist) return
    const { status } = updatedArtist
    setArtistStatus(status)
  }, [setArtistStatus])
  return (
    <div>
      <Button
        version="black small"
        loading={loading}
        onClick={() => updateStatus(artistId, buttonProps.newStatus)}
        trackComponentName="ArtistCampaignStatusButton"
      >
        {loading ? 'Loading...' : buttonProps.text}
      </Button>
      <Error error={error} />
    </div>
  )
}
