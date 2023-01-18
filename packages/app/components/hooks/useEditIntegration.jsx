import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import IntegrationsEditModal from '@/app/IntegrationsEditModal'

import { updateIntegration } from '@/helpers/integrationHelpers'
import { track } from '@/helpers/trackingHelpers'


const useEditIntegration = ({
  artistId,
  location,
  onSuccess = () => {},
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SIDE PANEL CONTEXT
  const { setSidePanelLoading } = React.useContext(SidePanelContext)

  // FUNCTION TO SAVE LINK
  const runSaveIntegration = React.useCallback(async (integration, link, action) => {
    setSidePanelLoading(true)
    const { res: updatedArtist, error } = await updateIntegration(artistId, integration, link, action)
    setSidePanelLoading(false)
    // Error
    if (error) {
      const errorVerbose = { message: `Could not ${action} integration: ${error.message}` }
      // eslint-disable-next-line
      openIntegrationModal(integration, action, errorVerbose)
      return
    }
    // Success
    onSuccess(updatedArtist)
    // TRACK
    const trackAction = action === 'add' ? 'add_integration' : 'remove_integration'
    track(trackAction, {
      pageName: location,
      integrationName: integration.platform,
    })
  // eslint-disable-next-line
  }, [setSidePanelLoading, onSuccess, updateIntegration])

  // FUNCTION TO OPEN EDIT MODAL
  const openIntegrationModal = React.useCallback((integration, action = 'add', error) => {
    const { platform, title: plaformTitle } = integration
    const cannotDelete = platform === 'facebook' || platform === 'instagram' || platform === 'tiktok'
    const buttons = cannotDelete
      ? [
        {
          text: 'OK',
          onClick: closeAlert,
        },
      ]
      : [
        {
          text: action === 'add' ? 'Save' : `Disconnect ${plaformTitle}`,
          onClick: () => {},
          id: action === 'add' ? 'save' : 'delete',
        },
        {
          text: 'Cancel',
          onClick: closeAlert,
          version: 'secondary',
        },
      ]
    const children = (
      <IntegrationsEditModal
        integration={integration}
        modalButtons={buttons}
        action={action}
        runSaveIntegration={runSaveIntegration}
        cannotDelete={cannotDelete}
        error={error}
      />
    )
    showAlert({ children, buttons })
  }, [showAlert, closeAlert, runSaveIntegration])

  return openIntegrationModal
}

export default useEditIntegration
