import React from 'react'
import shallow from 'zustand/shallow'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { updateIntegration } from '@/helpers/integrationHelpers'
import { fetchSavedLinks } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  updateLinks: state.updateLinks,
  formatIntegrationLinks: state.formatIntegrationLinks,
})

const useSaveIntegrationLink = () => {
  const { artistId, setArtist, artist } = React.useContext(ArtistContext)

  const { updateLinks, formatIntegrationLinks } = useControlsStore(getControlsStoreState, shallow)

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

    // Fetch the links again otherwise we don't have a link id to work with
    const { res, error: fetchLinksError } = await fetchSavedLinks(artistId)

    if (error) {
      return { error: fetchLinksError }
    }

    const { folders } = res
    const formatedIntegrationLinks = formatIntegrationLinks({ artist, folders })
    const integrationLink = formatedIntegrationLinks.find((link) => link.platform === integration.platform)

    // Update controls store links with the new integration link
    updateLinks('add', { newLink: integrationLink })

    return { savedLink: integrationLink }
  }

  return saveIntegrationLink
}

export default useSaveIntegrationLink
