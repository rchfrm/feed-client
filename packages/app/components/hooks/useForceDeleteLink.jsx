import React, { useCallback } from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import MarkdownText from '@/elements/MarkdownText'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import postsStore from '@/app/store/postsStore'
import linksStore from '@/app/store/linksStore'

import copy from '@/app/copy/PostsPageCopy'

const useForceDeleteLink = () => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const updatePostsWithMissingLinks = postsStore(useCallback(state => state.updatePostsWithMissingLinks, []))
  const defaultLink = linksStore(useCallback(state => state.defaultLink, []))
  // FUNCTION TO SHOW MODAL
  const showForceDeleteModal = React.useCallback((runDeleteItem, linkIds, itemType) => {
    const buttons = [
      {
        text: 'Delete anyway',
        // DELETE LINK
        onClick: async () => {
          setSidePanelLoading(true)
          const { error } = await runDeleteItem(true)
          if (error) return
          // After force deleting update posts that used these links
          updatePostsWithMissingLinks(linkIds, defaultLink.id)
        },
        color: 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    const children = <MarkdownText markdown={copy.confirmDeleteUsedLinkFolder(itemType)} />
    showAlert({ children, buttons, onClose: () => setSidePanelLoading(false) })
  }, [showAlert, closeAlert, setSidePanelLoading, updatePostsWithMissingLinks, defaultLink])

  return showForceDeleteModal
}

export default useForceDeleteLink
