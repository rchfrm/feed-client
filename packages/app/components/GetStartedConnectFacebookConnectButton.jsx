import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const GetStartedConnectFacebookConnectButton = ({ selectedProfile, setIsConnecting }) => {
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)
  const { setWizardState, currentStep } = React.useContext(WizardContext)

  const accountsToConnect = React.useMemo(() => {
    if (selectedProfile) {
      return Object.values(selectedProfile).map((profile) => profile)
    }
  }, [selectedProfile])

  const createArtist = async () => {
    setIsConnecting(true)

    setWizardState({
      type: 'set-state',
      payload: {
        [currentStep]: {
          forceShow: true,
        },
      },
    })

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(accountsToConnect)
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
      className="w-full sm:w-48 mb-5 sm:mb-0"
      trackComponentName="GetStartedConnectFacebookConnectButton"
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
