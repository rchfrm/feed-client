import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfiles from '@/app/GetStartedConnectFacebookProfiles'
import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'

import Spinner from '@/elements/Spinner'

import * as artistHelpers from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'

const GetStartedConnectFacebook = () => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, connectArtist } = React.useContext(ArtistContext)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { plan } = wizardState || {}

  const {
    auth,
    isFacebookRedirect,
    setIsFacebookRedirect,
  } = React.useContext(AuthContext)
  const { missingScopes: { ads: missingScopes } } = auth

  const { user } = React.useContext(UserContext)

  // Get available accounts
  useAsyncEffect(async (isMounted) => {
    if (isConnecting) return

    if (missingScopes.length || error) {
      setIsLoading(false)
      return
    }

    const { res, error: getArtistError } = await artistHelpers.getArtistOnSignUp()

    if (!isMounted()) return

    if (getArtistError) {
      if (getArtistError.message !== 'user cache is not available') {
        setError(getArtistError)
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

    const processedArtists = artistHelpers.processArtists({ artists: artistsFiltered })

    // Handle connecting a single artist
    if (processedArtists.length === 1 && isFacebookRedirect && !artistId) {
      setArtistAccounts(processedArtists)
      setSelectedProfile(processedArtists[0])

      setIsLoading(false)
      setIsConnecting(true)

      // Santise URLs
      const artistAccountSanitised = artistHelpers.sanitiseArtistAccountUrls(processedArtists[0])

      const { error } = await connectArtist(artistAccountSanitised, user, plan) || {}

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

  // Reset isFacebookRedirect boolean when leaving page
  React.useEffect(() => {
    return () => {
      setIsFacebookRedirect(false)
    }
  }, [setIsFacebookRedirect])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profile={selectedProfile} className="my-6 sm:my-0" />
  }

  if (isLoading || isConnecting) return <Spinner />

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
