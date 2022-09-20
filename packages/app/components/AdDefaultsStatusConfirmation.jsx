import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/PostsPageCopy'

import useAlertModal from '@/hooks/useAlertModal'

function CONFIRMATION_CONTENT() {
  return (
    <>
      <h2>Are you sure?</h2>
      <MarkdownText markdown={copy.globalStatusConfirmation} />
    </>
  )
}

const AdDefaultsStatusConfirmation = ({
  setShouldUpdatePostStatus,
  confirmationOpen,
  dismissConfirmation,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // DEFINE ALERT RESPONSES
  const resetAlert = React.useCallback(() => {
    dismissConfirmation()
    setShouldUpdatePostStatus(false)
  }, [dismissConfirmation, setShouldUpdatePostStatus])

  const acceptAlert = React.useCallback(() => {
    dismissConfirmation()
    setShouldUpdatePostStatus(true)
  }, [dismissConfirmation, setShouldUpdatePostStatus])

  React.useEffect(() => {
    if (!confirmationOpen) return closeAlert()
    showAlert({
      children: <CONFIRMATION_CONTENT />,
      buttons: [
        {
          text: 'Yes',
          color: 'green',
          onClick: acceptAlert,
        },
        {
          text: 'No',
          color: 'black',
          onClick: resetAlert,
        },
      ],
    })
  }, [confirmationOpen, resetAlert, acceptAlert, showAlert, closeAlert])

  return null
}

AdDefaultsStatusConfirmation.propTypes = {
  setShouldUpdatePostStatus: PropTypes.func.isRequired,
  confirmationOpen: PropTypes.bool.isRequired,
  dismissConfirmation: PropTypes.func.isRequired,
}

export default AdDefaultsStatusConfirmation
