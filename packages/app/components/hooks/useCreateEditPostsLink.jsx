import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsLinksEditModal from '@/app/PostsLinksEditModal'
import PostsLinksEditModalFolder from '@/app/PostsLinksEditModalFolder'

import { saveLink, saveFolder } from '@/app/helpers/postsHelpers'

const useCreateEditPostsLink = ({ action = 'add', itemType = 'link', onSave = () => {} }) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)

  // FUNCTION TO SAVE LINK
  const runSaveLink = React.useCallback(async (link, action) => {
    setSidePanelLoading(true)
    const { res, error } = await saveLink(link, action)
    onSave()
    // Error
    if (error) return
    // Success
    setSidePanelLoading(false)
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO SAVE FOLDER
  const runSaveFolder = React.useCallback(async (folder, action) => {
    setSidePanelLoading(true)
    const { res, error } = await saveFolder(folder, action)
    onSave()
    // Error
    if (error) return
    // Success
    setSidePanelLoading(false)
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO OPEN EDIT MODAL
  const openLink = React.useCallback((item = null) => {
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
    // Add delete button if editing link/folder
    if (action === 'edit') {
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
      />
    ) : (
      <PostsLinksEditModal
        link={item}
        modalButtons={buttons}
        action={action}
        runSaveLink={runSaveLink}
      />
    )
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, action, itemType, runSaveLink, runSaveFolder])

  return openLink
}

export default useCreateEditPostsLink
