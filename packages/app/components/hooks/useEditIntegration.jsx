import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import IntegrationsEditModal from '@/app/IntegrationsEditModal'

import { saveIntegration } from '@/app/helpers/integrationHelpers'


const useCreateEditPostsLink = ({ onSave = () => {} }) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)

  // FUNCTION TO SAVE LINK
  const runSaveIntegration = React.useCallback(async (integration, link, action) => {
    setSidePanelLoading(true)
    const { res, error } = await saveIntegration(integration, link, action)
    onSave()
    // Error
    if (error) return
    // Success
    setSidePanelLoading(false)
  }, [setSidePanelLoading, onSave])

  // FUNCTION TO OPEN EDIT MODAL
  const updateIntegration = React.useCallback((integration, action = 'add') => {
    const buttons = [
      {
        text: action === 'add' ? 'Save' : 'Delete',
        onClick: () => {},
        color: action === 'add' ? 'green' : 'red',
        id: action === 'add' ? 'save' : 'delete',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    const children = (
      <IntegrationsEditModal
        integration={integration}
        modalButtons={buttons}
        action={action}
        runSaveIntegration={runSaveIntegration}
      />
    )
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, runSaveIntegration])

  return updateIntegration
}

export default useCreateEditPostsLink
