import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsLinksEditModal from '@/app/PostsLinksEditModal'

import { saveLink } from '@/app/helpers/postsHelpers'

const useCreateEditPostsLink = ({ action = 'add', itemType= 'link', onSave = () => {} }) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // FUNCTION TO SAVE LINK
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const runSaveLink = React.useCallback(async (link, action) => {
    setSidePanelLoading(true)
    const { res, error } = await saveLink(link, action)
    onSave()
    // Error
    if (error) return
    // Success
    setSidePanelLoading(false)
  }, [setSidePanelLoading, onSave])
  // FUNCTION TO OPEN EDIT MODAL
  const openLink = React.useCallback((link = null) => {
    const buttons = [
      {
        text: 'Save',
        onClick: () => runSaveLink(link, action),
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    const children = <PostsLinksEditModal link={link} />
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, action, runSaveLink])

  return openLink
}

export default useCreateEditPostsLink
