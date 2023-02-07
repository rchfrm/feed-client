import React from 'react'

import shallow from 'zustand/shallow'

import useAlertModal from '@/hooks/useAlertModal'
import useForceDeleteLink from '@/app/hooks/useForceDeleteLink'

import { SidePanelContext } from '@/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import LinkBankEditModal from '@/app/LinkBankEditModal'
import LinkBankEditModalFolder from '@/app/LinkBankEditModalFolder'


import useControlsStore from '@/app/stores/controlsStore'
import { saveLink, saveFolder, setDefaultLink, usedLinkErrorCode } from '@/app/helpers/linksHelpers'

import { testValidIntegration, updateIntegration } from '@/helpers/integrationHelpers'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateLinks: state.updateLinks,
  setLinkBankError: state.setLinkBankError,
})

const useCreateEditLinkBankLink = ({
  action = 'add',
  itemType = 'link',
  onSave = () => {},
  onCancel = () => {},
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
    updateLinks,
    setLinkBankError,
  } = useControlsStore(getControlsStoreState, shallow)

  // TEST IF FOLDER CONTAINS DEFAULT LINK
  const testFolderContainsDefault = React.useCallback((folder) => {
    const { links } = folder
    const linkIds = links.map(({ id }) => id)
    return linkIds.includes(defaultLink.id)
  }, [defaultLink?.id])

  // GET FUNCTION TO FORCE DELETE
  const showForceDeleteModal = useForceDeleteLink()

  // SAVE LINK ON SERVER
  const updateLinkOnServer = async (newLink, action, oldLink, force) => {
    const { res: savedLink, error } = await saveLink(artistId, newLink, savedFolders, action, force)
    // Error
    if (error) {
      const { code: errorCode } = error
      if (errorCode === usedLinkErrorCode) {
        const runDeleteLink = () => updateLinkOnServer(newLink, action, oldLink, true)
        const linkIds = [oldLink.id]
        showForceDeleteModal(runDeleteLink, linkIds, 'link')
        return
      }
      // eslint-disable-next-line
      openLink(oldLink, error)
      setSidePanelLoading(false)
      return { error }
    }
    // Update store
    updateLinks(action, { newLink: savedLink, oldLink })
    // If created from default link selector, set as default
    if (location === 'defaultLink') {
      const { res: newArtist, error } = await setDefaultLink({ artistId, linkId: savedLink.id })
      if (error) {
        const linkBankError = `Error setting link as default: ${error.message}`
        setLinkBankError(linkBankError)
      }
      onSave(savedLink, newArtist)
      setSidePanelLoading(false)
      return { savedLink }
    }
    // Success
    onSave(savedLink)
    setSidePanelLoading(false)
    return { savedLink }
  }

  // SAVE FOLDER ON SERVER
  const updateFolderOnServer = async (newFolder, action, oldFolder, force) => {
    const isDefaultLinkInFolder = testFolderContainsDefault(oldFolder)
    const { res: savedFolder, error } = await saveFolder(artistId, newFolder, action, isDefaultLinkInFolder, force)
    // Error
    if (error) {
      const { code: errorCode } = error
      // Handle force delete
      if (errorCode === usedLinkErrorCode) {
        const runDeleteFolder = () => updateFolderOnServer(newFolder, action, oldFolder, true)
        const linkIds = oldFolder.links.map(({ id }) => id)
        showForceDeleteModal(runDeleteFolder, linkIds, 'folder')
        return { error }
      }
      // eslint-disable-next-line
      openLink(oldFolder, error)
      setSidePanelLoading(false)
      return
    }
    // Update store
    updateLinks(action, { newFolder: savedFolder, oldFolder })
    // Success
    onSave(savedFolder)
    setSidePanelLoading(false)
    return { savedFolder }
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
      },
      {
        text: 'Save as Link',
        onClick: () => {
          setSidePanelLoading(true)
          updateLinkOnServer(newLink, action, oldLink)
        },
        version: 'secondary',
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
    await updateLinkOnServer(newLink, action, oldLink)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO SAVE FOLDER
  const runSaveFolder = React.useCallback(async (newFolder, action, oldFolder) => {
    setSidePanelLoading(true)
    await updateFolderOnServer(newFolder, action, oldFolder)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave, testFolderContainsDefault])


  // FUNCTION TO OPEN EDIT MODAL
  const openLink = React.useCallback((item = null, error) => {
    const isPostLink = location === 'post'
    const buttons = [
      {
        text: isPostLink ? 'Add' : 'Save',
        onClick: () => {},
        id: 'save',
      },
      {
        text: 'Cancel',
        onClick: () => {
          closeAlert()
          onCancel()
        },
        version: 'secondary',
      },
    ]
    // Is this the default link?
    const isDefaultLink = !! (item && item.id === defaultLink.id)
    // Does the folder contain the default link?
    const isDefaultLinkInFolder = itemType !== 'folder' ? false : testFolderContainsDefault(item)
    // Add delete button if editing link/folder
    if (action === 'edit' && ! isDefaultLink && ! isDefaultLinkInFolder) {
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
      <LinkBankEditModalFolder
        folder={item}
        modalButtons={buttons}
        action={action}
        runSaveFolder={runSaveFolder}
        isDefaultLinkInFolder={isDefaultLinkInFolder}
        error={error}
      />
    ) : (
      <LinkBankEditModal
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
  }, [showAlert, closeAlert, action, itemType, runSaveLink, runSaveFolder, defaultLink?.id, testFolderContainsDefault, location, onCancel])

  return openLink
}

export default useCreateEditLinkBankLink
