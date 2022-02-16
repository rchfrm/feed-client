import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const GetStartedConnectFacebookConnectButton = ({ selectedProfile, setIsConnecting }) => {
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)

  const createArtist = async () => {
    setIsConnecting(true)

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls([selectedProfile])
    const { error } = await connectArtists(artistAccountsSanitised, user) || {}

    if (error) {
      setIsConnecting(false)
    }

    setIsConnecting(false)
  }

  return (
    <Button
      version="green"
      onClick={createArtist}
      className="w-48"
      trackComponentName="GetStartedDailyBudgetStep"
    >
      Next
      <ArrowAltIcon
        className="ml-3"
        direction="right"
        fill="white"
      />
    </Button>
  )
}

GetStartedConnectFacebookConnectButton.propTypes = {
  selectedProfile: PropTypes.object,
  setIsConnecting: PropTypes.func.isRequired,
}

GetStartedConnectFacebookConnectButton.defaultProps = {
  selectedProfile: null,
}

export default GetStartedConnectFacebookConnectButton
