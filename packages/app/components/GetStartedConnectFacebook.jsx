import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import GetStartedConnectFacebookConnectedProfile from '@/app/GetStartedConnectFacebookConnectedProfile'
import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfiles from '@/app/GetStartedConnectFacebookProfiles'
import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'

import Spinner from '@/elements/Spinner'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const GetStartedConnectFacebook = () => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, connectArtists } = React.useContext(ArtistContext)

  const { auth } = React.useContext(AuthContext)
  const { missingScopes: { ads: missingScopes } } = auth

  const { user } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  // Get available accounts
  useAsyncEffect(async (isMounted) => {
    if (isConnecting) return

    if (missingScopes.length || error || connectedArtists.length) {
      setIsLoading(false)
      return
    }

    const { res, error: getArtistError } = await artistHelpers.getArtistOnSignUp()

    if (!isMounted()) return

    if (getArtistError) {
      if (getArtistError.message !== 'user cache is not available') {
        setError(getArtistError?.message?.previous || getArtistError)
      }

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

    // Handle connecting a single artist
    if (Object.keys(processedArtists).length === 1 && !artistId) {
      setArtistAccounts(processedArtists)
      setSelectedProfile(processedArtists)

      setIsLoading(false)
      setIsConnecting(true)

      // Santise URLs
      const artistToConnect = Object.values(artistsFiltered).map((artistFiltered) => artistFiltered)
      const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistToConnect)

      const { error } = await connectArtists(artistAccountsSanitised, user) || {}

      if (!isMounted()) return

      if (error) {
        setIsConnecting(false)
        setError(error)

        return
      }
      setIsConnecting(false)
      return
    }

    setArtistAccounts(processedArtists)
    setIsLoading(false)
  }, [])

  if (isConnecting && Object.keys(selectedProfile).length > 0) {
    return <ConnectProfilesIsConnecting artistAccounts={selectedProfile} className="my-6 sm:my-0" />
  }

  if (isLoading || isConnecting) return <Spinner />

  if (connectedArtists.length && !isConnecting) {
    return (
      <GetStartedConnectFacebookConnectedProfile connectedArtists={connectedArtists} />
    )
  }

  return (
    <div className="flex flex-1 flex-column mb-6">
      {Object.keys(artistAccounts).length === 0 ? (
        <GetStartedConnectFacebookNoProfiles
          auth={auth}
          error={error}
        />
      ) : (
        <GetStartedConnectFacebookProfiles
          artistAccounts={artistAccounts}
          setIsConnecting={setIsConnecting}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
        />
      )}
    </div>
  )
}

GetStartedConnectFacebook.propTypes = {
}

GetStartedConnectFacebook.defaultProps = {
}

export default GetStartedConnectFacebook
