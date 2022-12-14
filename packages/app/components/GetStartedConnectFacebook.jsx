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
  const [errors, setErrors] = React.useState([])
  const [isCannotListPagesError, setIsCannotListPagesError] = React.useState(false)

  const { artistId, connectArtist } = React.useContext(ArtistContext)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { plan } = wizardState || {}

  const {
    auth,
    isPlatformRedirect,
    setIsPlatformRedirect,
  } = React.useContext(AuthContext)
  const { missingScopes: { ads: missingScopes } } = auth

  const { user } = React.useContext(UserContext)

  // Get available accounts
  useAsyncEffect(async (isMounted) => {
    if (isConnecting) return

    if (missingScopes.length || errors.length) {
      setIsLoading(false)
      return
    }

    const { res, error } = await artistHelpers.getArtistOnSignUp()

    if (! isMounted()) return

    if (error) {
      if (error.message === 'user cache is not available') {
        setIsLoading(false)
        return
      }

      if (error.message === 'cannot list facebook pages') {
        setIsCannotListPagesError(true)
        setIsLoading(false)
        return
      }

      setErrors([error])
      setIsLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if there are no accounts
    if (Object.keys(artistAccounts).length === 0) {
      setErrors([{ message: 'No accounts were found' }])
      setIsLoading(false)
    }

    const userArtists = user?.artists || []
    const artistsFiltered = ! user.artists.length ? artistAccounts : artistHelpers.removeAlreadyConnectedArtists(artistAccounts, userArtists)

    const processedArtists = artistHelpers.processArtists({ artists: artistsFiltered })

    // Handle connecting a single artist
    if (processedArtists.length === 1 && isPlatformRedirect && ! artistId) {
      setArtistAccounts(processedArtists)
      setSelectedProfile(processedArtists[0])

      setIsLoading(false)
      setIsConnecting(true)

      // Santise URLs
      const artistAccountSanitised = artistHelpers.sanitiseArtistAccountUrls(processedArtists[0])

      const { error } = await connectArtist(artistAccountSanitised, user, plan) || {}

      if (! isMounted()) return

      if (error) {
        setIsConnecting(false)
        setErrors([error])

        return
      }
      setIsConnecting(false)
      return
    }

    setArtistAccounts(processedArtists)
    setIsLoading(false)
  }, [])

  // Reset isPlatformRedirect boolean when leaving page
  React.useEffect(() => {
    return () => {
      setIsPlatformRedirect(false)
    }
  }, [setIsPlatformRedirect])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profile={selectedProfile} className="my-6 sm:my-0" />
  }

  if (isLoading || isConnecting) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6">
      {Object.keys(artistAccounts).length === 0 ? (
        <GetStartedConnectFacebookNoProfiles
          auth={auth}
          errors={errors}
          isCannotListPagesError={isCannotListPagesError}
          setIsConnecting={setIsConnecting}
          setSelectedProfile={setSelectedProfile}
          setErrors={setErrors}
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
