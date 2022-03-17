import React from 'react'
import shallow from 'zustand/shallow'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { updateIntegration, formatAndFilterIntegrations } from '@/helpers/integrationHelpers'
import { splitLinks } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  fetchAndUpdateLinks: state.fetchAndUpdateLinks,
})

const useSaveIntegrationLink = () => {
  const { artistId, setArtist, artist } = React.useContext(ArtistContext)

  const { fetchAndUpdateLinks } = useControlsStore(getControlsStoreState, shallow)
  const saveIntegrationLink = async (integration, link) => {
    const { res: updatedArtist, error } = await updateIntegration(artistId, integration, link, 'add')

    if (error) {
      return { error }
    }

    // Update artist context
    const { integrations } = updatedArtist

    setArtist({
      type: 'update-integrations',
      payload: {
        integrations,
      },
    })

    const updatedIntegrations = formatAndFilterIntegrations(integrations)
    const artistWithFormattedIntegrations = { ...artist, integrations: updatedIntegrations }

    // Fetch the linkbank links again and update the controls store with the new integration link
    const nestedLinks = await fetchAndUpdateLinks(artistWithFormattedIntegrations)

    const { integrationLinks = [] } = splitLinks(nestedLinks)
    const integrationLink = integrationLinks.find((link) => link.platform === integration.platform)

    return { savedLink: integrationLink }
  }

  return saveIntegrationLink
}

export default useSaveIntegrationLink
