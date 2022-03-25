import React from 'react'
import shallow from 'zustand/shallow'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { saveLink } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  savedLinks: state.savedLinks,
  updateLinks: state.updateLinks,
})

const useSaveLinkToLinkBank = () => {
  const {
    savedFolders,
    updateLinks,
  } = useControlsStore(getControlsStoreState, shallow)

  const { artistId } = React.useContext(ArtistContext)

  const saveLinkToLinkBank = async (link, action = 'add') => {
    const { res, error } = await saveLink(artistId, link, savedFolders, action)

    if (error) {
      const saveLinkError = `Error saving link: ${error.message}`

      return { error: { message: saveLinkError } }
    }

    // Update controls store links with the new integration link
    updateLinks(action, { newLink: res, oldLink: link })

    return { savedLink: res }
  }

  return saveLinkToLinkBank
}

export default useSaveLinkToLinkBank
