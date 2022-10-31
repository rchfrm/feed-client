import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/PostsPageCopy'

import useAlertModal from '@/hooks/useAlertModal'

const AdDefaultsStatusConfirmation = ({
  setShouldUpdatePostStatus,
  confirmationOpen,
  dismissConfirmation,
  postType,
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

  const alertContent = React.useMemo(() => {
    return (
      <>
        <h2>Are you sure?</h2>
        <MarkdownText markdown={copy.globalStatusConfirmation(postType)} />
      </>
    )
  }, [postType])

  React.useEffect(() => {
    if (!confirmationOpen) return closeAlert()
    showAlert({
      children: alertContent,
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
  }, [confirmationOpen, resetAlert, acceptAlert, showAlert, closeAlert, postType, alertContent])

  return null
}

AdDefaultsStatusConfirmation.propTypes = {
  setShouldUpdatePostStatus: PropTypes.func.isRequired,
  confirmationOpen: PropTypes.bool.isRequired,
  dismissConfirmation: PropTypes.func.isRequired,
  postType: PropTypes.string.isRequired,
}

export default AdDefaultsStatusConfirmation
