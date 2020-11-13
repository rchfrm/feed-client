import React from 'react'

import shallow from 'zustand/shallow'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import PostsLinksEditModal from '@/app/PostsLinksEditModal'
import PostsLinksEditModalFolder from '@/app/PostsLinksEditModalFolder'


import linksStore from '@/app/store/linksStore'
import { saveLink, saveFolder, setDefaultLink } from '@/app/helpers/linksHelpers'

import { testValidIntegration, updateIntegration } from '@/app/helpers/integrationHelpers'

import copy from '@/app/copy/PostsPageCopy'

const getLinksStoreState = (state) => ({
  defaultLink: state.defaultLink,
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateLinksStore: state.updateLinksStore,
  setLinkBankError: state.setLinkBankError,
})

const useCreateEditPostsLink = ({
  action = 'add',
  itemType = 'link',
  onSave = () => {},
  location = 'links',
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // ARTIST CONTEXT
  const { setArtist } = React.useContext(ArtistContext)

  // READ FROM LINKS STORE
  const {
    defaultLink,
    artistId,
    savedFolders,
    updateLinksStore,
    setLinkBankError,
  } = linksStore(getLinksStoreState, shallow)

  // TEST IF FOLDER CONTAINS DEFAULT LINK
  const testFolderContainsDefault = React.useCallback((folder) => {
    const { links } = folder
    const linkIds = links.map(({ id }) => id)
    return linkIds.includes(defaultLink.id)
  }, [defaultLink.id])

  // SAVE LINK ON SERVER
  const saveLinkOnServer = async (newLink, action, oldLink) => {
    const { res: savedLink, error } = await saveLink(artistId, newLink, savedFolders, action)
    // Error
    if (error) {
      // eslint-disable-next-line
      openLink(oldLink, error)
      return
    }
    // Update store
    updateLinksStore(action, { newLink: savedLink, oldLink })
    // If created from default link selector, set as default
    if (location === 'defaultLink') {
      const { res: newArtist, error } = await setDefaultLink(artistId, savedLink.id)
      if (error) {
        const linkBankError = `Error setting link as default: ${error.message}`
        setLinkBankError(linkBankError)
      }
      // Update store to include new link
      updateLinksStore('updateDefault', { newArtist })
    }
    // Success
    onSave(savedLink)
    setSidePanelLoading(false)
  }

  // SAVE FOLDER ON SERVER
  const saveFolderOnServer = async (newFolder, action, oldFolder) => {
    const isDefaultLinkInFolder = testFolderContainsDefault(oldFolder)
    const { res: savedFolder, error } = await saveFolder(artistId, newFolder, action, isDefaultLinkInFolder)
    // Error
    if (error) {
      // eslint-disable-next-line
      openLink(oldFolder, error)
      return
    }
    // Update store
    updateLinksStore(action, { newFolder: savedFolder, oldFolder })
    // Success
    onSave(savedFolder)
    setSidePanelLoading(false)
  }

  // TEST AS INTEGRATION LINKS
  const testLinkAsIntegration = (link) => {
    const platformsToTest = ['spotify', 'soundcloud', 'youtube']
    return platformsToTest.find((platform) => testValidIntegration(link, platform))
  }

  // SHOW INTEGRATION OPTION
  const showIntegrationOptionModal = (newLink, action, oldLink, platform) => {
    const buttons = [
      {
        text: 'Save as Integration',
        // SAVE INTEGRATION
        onClick: async () => {
          setSidePanelLoading(true)
          const { res: updatedArtist, error } = await updateIntegration(artistId, { platform }, newLink.href)
          setSidePanelLoading(false)
          if (error) {
            setLinkBankError(error)
            return
          }
          const { integrations } = updatedArtist
          // Update artist and links store after saving integration
          setArtist({
            type: 'update-integrations',
            payload: {
              integrations,
            },
          })
        },
        color: 'green',
      },
      {
        text: 'Save as Link',
        onClick: () => {
          setSidePanelLoading(true)
          saveLinkOnServer(newLink, action, oldLink)
        },
        color: 'black',
      },
    ]
    const children = <MarkdownText markdown={copy.checkSaveAsIntegration(platform)} />
    showAlert({ children, buttons, onClose: () => setSidePanelLoading(false) })
  }

  // FUNCTION TO SAVE LINK
  const runSaveLink = React.useCallback(async (newLink, action, oldLink) => {
    setSidePanelLoading(true)
    // Test if link is a valid integration
    const matchingIntegrationPlatform = action === 'add' ? testLinkAsIntegration(newLink.href) : null
    // If link is integration,
    // confirm whether they want to save as integration or link
    if (matchingIntegrationPlatform) {
      showIntegrationOptionModal(newLink, action, oldLink, matchingIntegrationPlatform)
      return
    }
    await saveLinkOnServer(newLink, action, oldLink)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO SAVE FOLDER
  const runSaveFolder = React.useCallback(async (newFolder, action, oldFolder) => {
    setSidePanelLoading(true)
    await saveFolderOnServer(newFolder, action, oldFolder)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave, testFolderContainsDefault])


  // FUNCTION TO OPEN EDIT MODAL
  const openLink = React.useCallback((item = null, error) => {
    const isPostLink = location === 'post'
    const buttons = [
      {
        text: isPostLink ? 'Set and save' : 'Save',
        onClick: () => {},
        color: 'green',
        id: 'save',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    // Is this the default link?
    const isDefaultLink = !!(item && item.id === defaultLink.id)
    // Does the folder contain the default link?
    const isDefaultLinkInFolder = itemType !== 'folder' ? false : testFolderContainsDefault(item)
    // Add delete button if editing link/folder
    if (action === 'edit' && !isDefaultLink && !isDefaultLinkInFolder) {
      // Make save button half width
      buttons[0].width = 'half'
      // Add delete
      buttons.splice(1, 0, {
        text: 'Delete',
        onClick: () => {},
        color: 'red',
        id: 'delete',
        width: 'half',
      })
    }
    const children = itemType === 'folder' ? (
      <PostsLinksEditModalFolder
        folder={item}
        modalButtons={buttons}
        action={action}
        runSaveFolder={runSaveFolder}
        isDefaultLinkInFolder={isDefaultLinkInFolder}
        error={error}
      />
    ) : (
      <PostsLinksEditModal
        link={item}
        modalButtons={buttons}
        action={action}
        runSaveLink={runSaveLink}
        isDefaultLink={isDefaultLink}
        isPostLink={isPostLink}
        error={error}
      />
    )
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, action, itemType, runSaveLink, runSaveFolder, defaultLink.id, testFolderContainsDefault, location])

  return openLink
}

export default useCreateEditPostsLink
