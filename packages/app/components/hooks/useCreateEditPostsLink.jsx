import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsLinksEditModal from '@/app/PostsLinksEditModal'
import PostsLinksEditModalFolder from '@/app/PostsLinksEditModalFolder'

import { saveLink, saveFolder } from '@/app/helpers/postsHelpers'

import usePostsStore from '@/app/hooks/usePostsStore'

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

  // GET DEFAULT LINK
  const { defaultLink } = usePostsStore()

  // TEST IF FOLDER CONTAINS DEFAULT LINK
  const testFolderContainsDefault = React.useCallback((folder) => {
    const { linkIds } = folder
    return linkIds.includes(defaultLink.id)
  }, [defaultLink.id])

  // FUNCTION TO SAVE LINK
  const runSaveLink = React.useCallback(async (newLink, action, initialLink) => {
    setSidePanelLoading(true)
    const { res, error } = await saveLink(newLink, action)
    // Error
    if (error) {
      // eslint-disable-next-line
      openLink(initialLink, error)
      return
    }
    // Success
    onSave()
    setSidePanelLoading(false)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO SAVE FOLDER
  const runSaveFolder = React.useCallback(async (newFolder, action, initialFolder) => {
    setSidePanelLoading(true)
    const isDefaultLinkInFolder = testFolderContainsDefault(initialFolder)
    const { res, error } = await saveFolder(newFolder, action, isDefaultLinkInFolder)
    // Error
    if (error) {
      // eslint-disable-next-line
      openLink(initialFolder, error)
      return
    }
    // Success
    onSave()
    setSidePanelLoading(false)
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSave, testFolderContainsDefault])


  // FUNCTION TO OPEN EDIT MODAL
  const openLink = React.useCallback((item = null, error) => {
    const buttons = [
      {
        text: 'Save',
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
      buttons.splice(1, 0, {
        text: 'Delete',
        onClick: () => {},
        color: 'red',
        id: 'delete',
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
        isPostLink={location === 'post'}
        error={error}
      />
    )
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, action, itemType, runSaveLink, runSaveFolder, defaultLink.id, testFolderContainsDefault, location])

  return openLink
}

export default useCreateEditPostsLink
