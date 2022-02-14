import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { UserContext } from '@/app/contexts/UserContext'

import GetStartedConnectFacebookConnectedProfile from '@/app/GetStartedConnectFacebookConnectedProfile'
import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfilesList from '@/app/GetStartedConnectFacebookProfilesList'

import Spinner from '@/elements/Spinner'

import { getArtistOnSignUp, processArtists, getSortedArtistAccountsArray } from '@/app/helpers/artistHelpers'

const GetStartedConnectFacebook = ({ scopes }) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [hasSaved, setHasSaved] = React.useState(false)

  const { user } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  // Get available accounts
  useAsyncEffect(async (isMounted) => {
    if (!isMounted) return
    const { res, error } = await getArtistOnSignUp()

    if (error) {
      setIsLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if there are no accounts
    if (Object.keys(artistAccounts).length === 0) {
      // Show error
      setIsLoading(false)
    }

    const processedArtists = await processArtists({ artists: artistAccounts })
    const artistAccountsArray = getSortedArtistAccountsArray(processedArtists)

    setArtistAccounts(artistAccountsArray)
    setIsLoading(false)
  }, [])

  if (isLoading || isConnecting) return <Spinner />

  if (connectedArtists.length && hasSaved) {
    return (
      <GetStartedConnectFacebookConnectedProfile connectedArtists={connectedArtists} />
    )
  }

  if (artistAccounts.length === 0) {
    return (
      <GetStartedConnectFacebookNoProfiles scopes={scopes} />
    )
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">You've connected multiple profiles, which would you like to set-up first?</h3>
      <div className="flex flex-1 justify-center items-center">
        <GetStartedConnectFacebookProfilesList
          profiles={artistAccounts}
          setIsConnecting={setIsConnecting}
          setHasSaved={setHasSaved}
        />
      </div>
    </div>
  )
}

GetStartedConnectFacebook.propTypes = {
  scopes: PropTypes.array.isRequired,
}

GetStartedConnectFacebook.defaultProps = {
}

export default GetStartedConnectFacebook
