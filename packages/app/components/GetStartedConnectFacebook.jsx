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
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { getArtistOnSignUp, processArtists, getSortedArtistAccountsArray, updateArtist } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const GetStartedConnectFacebook = ({ scopes }) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
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
    const { res, error } = await getArtistOnSignUp()

    if (error) {
      setError(error)
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

    const { res: artist, error } = await updateArtist(artistId, { ...data, defaultLink: link.id })

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
      <h3 className="mb-4 font-medium text-xl mb-4">{copy.facebookConnectMultipleProfilesSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.facebookConnectMultipleProfilesDescription} />
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center">
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