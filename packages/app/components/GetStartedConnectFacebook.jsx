import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import GetStartedConnectFacebookConnectedProfile from '@/app/GetStartedConnectFacebookConnectedProfile'
import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfiles from '@/app/GetStartedConnectFacebookProfiles'
import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'

import Spinner from '@/elements/Spinner'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const GetStartedConnectFacebook = ({ scopes }) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { connectArtists } = React.useContext(ArtistContext)

  const { user } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  // Get available accounts
  useAsyncEffect(async (isMounted) => {
    if (!isMounted) return
    const { res, error } = await artistHelpers.getArtistOnSignUp()

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if there are no accounts
    if (Object.keys(artistAccounts).length === 0) {
      setError({ message: 'No accounts were found' })
      setIsLoading(false)
    }

    const userArtists = user?.artists || []
    const artistsFiltered = !user.artists.length ? artistAccounts : artistHelpers.removeAlreadyConnectedArtists(artistAccounts, userArtists)

    const processedArtists = await artistHelpers.processArtists({ artists: artistsFiltered })
    const artistAccountsArray = artistHelpers.getSortedArtistAccountsArray(processedArtists)

    // Handle connecting a single artist
    if (Object.keys(processedArtists).length === 1) {
      setArtistAccounts(artistAccountsArray)
      setSelectedProfile(processedArtists)

      setIsLoading(false)
      setIsConnecting(true)

      // Santise URLs
      const artistToConnect = Object.values(artistsFiltered).map((artistFiltered) => artistFiltered)
      const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistToConnect)

      const { error } = await connectArtists(artistAccountsSanitised, user) || {}

      if (error) {
        setIsConnecting(false)
        setError(error)

        return
      }
      setIsConnecting(false)
      return
    }

    setArtistAccounts(artistAccountsArray)
    setIsLoading(false)
  }, [])

  if (isConnecting && Object.keys(artistAccounts).length > 0) {
    return <ConnectProfilesIsConnecting artistAccounts={[selectedProfile]} />
  }

  if (isLoading || isConnecting) return <Spinner />

  if (connectedArtists.length && !isConnecting) {
    return (
      <GetStartedConnectFacebookConnectedProfile connectedArtists={connectedArtists} />
    )
  }

  return (
    <div className="flex flex-1 flex-column">
      {artistAccounts.length === 0 ? (
        <GetStartedConnectFacebookNoProfiles scopes={scopes} />
      ) : (
        <GetStartedConnectFacebookProfiles
          artistAccounts={artistAccounts}
          setIsConnecting={setIsConnecting}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          error={error}
        />
      )}
    </div>
  )
}

GetStartedConnectFacebook.propTypes = {
  scopes: PropTypes.array.isRequired,
}

GetStartedConnectFacebook.defaultProps = {
}

export default GetStartedConnectFacebook
