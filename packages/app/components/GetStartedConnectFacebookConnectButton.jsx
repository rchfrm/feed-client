import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'
import { UserContext } from '@/app/contexts/UserContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as artistHelpers from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import { updateArtist } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const GetStartedConnectFacebookConnectButton = ({ profiles, setIsConnecting }) => {
  const { user } = React.useContext(UserContext)
  const { artistId, connectArtists } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)

  const { nestedLinks } = useControlsStore(getControlsStoreState)
  const saveLinkToLinkBank = useSaveLinkToLinkBank()

  const createArtist = async () => {
    setIsConnecting(true)

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(profiles)
    const { error } = await connectArtists(artistAccountsSanitised, user) || {}

    if (error) {
      setIsConnecting(false)
    }

    setIsConnecting(false)
  }

  // Patch artist data based on objective and platform
  useAsyncEffect(async (isMounted) => {
    if (!artistId || !isMounted()) return

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

    await updateArtist(artistId, { ...data, defaultLink: link.id })

    setIsConnecting(false)
    next()
  }, [artistId])

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
  profiles: PropTypes.array.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
}

GetStartedConnectFacebookConnectButton.defaultProps = {
}

export default GetStartedConnectFacebookConnectButton
