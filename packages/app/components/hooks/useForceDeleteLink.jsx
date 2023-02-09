import React, { useCallback } from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import MarkdownText from '@/elements/MarkdownText'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import usePostsStore from '@/app/stores/postsStore'

import copy from '@/app/copy/PostsPageCopy'

const useForceDeleteLink = () => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const updatePostsWithMissingLinks = usePostsStore(useCallback((state) => state.updatePostsWithMissingLinks, []))
  // FUNCTION TO SHOW MODAL
  const showForceDeleteModal = React.useCallback((runDeleteItem, linkIds, itemType) => {
    const buttons = [
      {
        text: 'Cancel',
        onClick: closeAlert,
        version: 'secondary',
      },
      {
        text: 'Delete anyway',
        // DELETE LINK
        onClick: async () => {
          setSidePanelLoading(true)
          const { error } = await runDeleteItem(true)
          if (error) return
          // After force deleting update posts that used these links
          updatePostsWithMissingLinks(linkIds)
        },
      },
    ]
    const children = <MarkdownText markdown={copy.confirmDeleteUsedLinkFolder(itemType)} />
    showAlert({ children, buttons, onClose: () => setSidePanelLoading(false) })
  }, [showAlert, closeAlert, setSidePanelLoading, updatePostsWithMissingLinks])

  return showForceDeleteModal
}

export default useForceDeleteLink
