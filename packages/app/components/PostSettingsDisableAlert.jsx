import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'
import copy from '@/app/copy/PostsPageCopy'

const PostSettingsDisableAlert = ({
  shouldShowAlert,
  onConfirm,
  onCancel,
  campaignType,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.postStatusConfirmation(campaignType)} className="mb-0" />
  }, [campaignType])

  React.useEffect(() => {
    if (! shouldShowAlert) {
      return closeAlert()
    }

    const buttons = [
      {
        text: 'Continue',
        onClick: () => {
          onConfirm()
          closeAlert()
        },
      },
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
          closeAlert()
        },
        version: 'secondary',
      },
    ]

    showAlert({
      children: alertContents,
      buttons,
    })
  }, [shouldShowAlert, onConfirm, onCancel, alertContents, showAlert, closeAlert])

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

PostSettingsDisableAlert.propTypes = {
  shouldShowAlert: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

export default PostSettingsDisableAlert
