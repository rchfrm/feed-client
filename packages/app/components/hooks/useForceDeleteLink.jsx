import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import MarkdownText from '@/elements/MarkdownText'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import copy from '@/app/copy/PostsPageCopy'

const useForceDeleteLink = () => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // FUNCTION TO SHOW MODAL
  const showForceDeleteModal = React.useCallback((deleteLink) => {
    const buttons = [
      {
        text: 'Delete anyway',
        // DELETE LINK
        onClick: () => {
          deleteLink(true)
        },
        color: 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    const children = <MarkdownText markdown={copy.confirmDeleteUsedLink} />
    showAlert({ children, buttons, onClose: () => setSidePanelLoading(false) })
  }, [showAlert, closeAlert, setSidePanelLoading])

  return showForceDeleteModal
}

export default useForceDeleteLink
