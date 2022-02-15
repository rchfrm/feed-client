import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'

import GetStartedConnectFacebookConnectedProfile from '@/app/GetStartedConnectFacebookConnectedProfile'
import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfilesList from '@/app/GetStartedConnectFacebookProfilesList'

import Spinner from '@/elements/Spinner'

import { getArtistOnSignUp, processArtists, getSortedArtistAccountsArray, updateArtist } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
})

const GetStartedConnectFacebook = ({ scopes }) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  const { nestedLinks, optimizationPreferences, updatePreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const saveLinkToLinkBank = useSaveLinkToLinkBank()

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

  // If needed patch artist data based on objective and platform
  useAsyncEffect(async (isMounted) => {
    if (!artistId || objective || !isMounted()) return

    setIsConnecting(true)
    const data = JSON.parse(getLocalStorage('getStartedWizard'))

    if (!data) return

    const { platform, defaultLink } = data
    let link = ''

    // If user has provided a link then save it to the linkbank
    if (defaultLink) {
      const { savedLink, error } = await saveLinkToLinkBank(defaultLink)

      if (error) {
        return
      }

      link = savedLink
    } else {
      // Otherwise get the link from the linkbank based on previously chosen platform (either Facebook or Instagram)
      link = getLinkByPlatform(nestedLinks, platform)
    }

    const { res: artist, error } = await updateArtist(artistId, { ...data, defaultLink: link.id })

    if (error) {
      return
    }

    // Update global store value
    updatePreferences(
      'optimizationPreferences',
      {
        objective: artist.preferences.optimization.objective,
        platform: artist.preferences.optimization.objective,
      },
    )

    setIsConnecting(false)
  }, [artistId])

  if (isLoading || isConnecting) return <Spinner />

  if (connectedArtists.length && !isConnecting) {
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
