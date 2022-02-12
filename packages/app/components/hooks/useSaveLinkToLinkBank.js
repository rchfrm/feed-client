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

  const saveLinkToLinkBank = async (link) => {
    const action = 'add'
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders, action)

    // Add the new link to the controls store
    if (error) {
      return { error }
    }

    updateLinks(action, { newLink: savedLink, oldLink: link })

    return { savedLink }
  }

  return saveLinkToLinkBank
}

export default useSaveLinkToLinkBank
