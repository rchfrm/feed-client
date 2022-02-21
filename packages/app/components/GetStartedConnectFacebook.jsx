import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'

import GetStartedConnectFacebookConnectedProfile from '@/app/GetStartedConnectFacebookConnectedProfile'
import GetStartedConnectFacebookNoProfiles from '@/app/GetStartedConnectFacebookNoProfiles'
import GetStartedConnectFacebookProfiles from '@/app/GetStartedConnectFacebookProfiles'
import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'

import Spinner from '@/elements/Spinner'

import * as artistHelpers from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const GetStartedConnectFacebook = ({ scopes }) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId, connectArtists } = React.useContext(ArtistContext)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)

  const { user } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  const {
    nestedLinks,
    updateLinks,
    optimizationPreferences,
    updatePreferences,
    defaultLink,
  } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const saveLinkToLinkBank = useSaveLinkToLinkBank()

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

  // If needed patch artist data based on objective and platform
  useAsyncEffect(async (isMounted) => {
    if (!artistId || !isMounted()) return

    if ([objective, platform, defaultLink].every(Boolean)) return

    setIsConnecting(true)
    const data = JSON.parse(getLocalStorage('getStartedWizard'))

    if (!data) return

    const { platform: storedPlatform, defaultLink: storedDefaultLink } = data
    let link = ''

    // If user has provided a link then save it to the linkbank
    if (storedDefaultLink) {
      const { savedLink, error } = await saveLinkToLinkBank(storedDefaultLink)

      if (error) {
        setError(error)
        return
      }

      link = savedLink
    } else {
      // Otherwise get the link from the linkbank based on previously chosen platform (either Facebook or Instagram)
      link = getLinkByPlatform(nestedLinks, storedPlatform)
    }

    const { res: artist, error } = await artistHelpers.updateArtist(artistId, { ...data, defaultLink: link.id })

    if (error) {
      setError(error)
      return
    }

    // Set the new link as the default link
    updateLinks('chooseNewDefaultLink', { newArtist: artist })

    const currentObjective = artist.preferences.optimization.objective

    // Update preferences in controls store
    updatePreferences({
      postsPreferences: {
        callToAction: artist.preferences.posts.call_to_action,
        defaultLinkId: artist.preferences.posts.default_link_id,
        promotionEnabled: artist.preferences.posts.promotion_enabled_default,
      },
      optimizationPreferences: {
        objective: artist.preferences.optimization.objective,
        platform: artist.preferences.optimization.platform,
      },
      conversionsPreferences: {
        ...(currentObjective === 'sales' && { callToAction: artist.preferences.conversions.call_to_action }),
        ...((currentObjective === 'sales' || currentObjective === 'traffic') && { facebookPixelEvent: artist.preferences.conversions.facebook_pixel_event }),
      },
    })

    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'

    saveTargetingSettings({
      ...targetingState,
      platforms: isFacebookOrInstagram ? [platform] : [],
    })

    setIsConnecting(false)
  }, [artistId])

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
