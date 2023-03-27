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
  isPostActive,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.disablePostWarning(isPostActive, campaignType)} className="mb-0" />
  }, [isPostActive, campaignType])

  React.useEffect(() => {
    if (! shouldShowAlert) {
      return closeAlert()
    }

    const buttons = [
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
          closeAlert()
        },
        version: 'secondary',
      },
      {
        text: isPostActive ? 'Continue' : 'Pause budget',
        onClick: () => {
          onConfirm()
          closeAlert()
        },
      },
    ]

    showAlert({
      children: alertContents,
      buttons,
    })
  }, [shouldShowAlert, onConfirm, onCancel, alertContents, showAlert, closeAlert, isPostActive])

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
  isPostActive: PropTypes.bool.isRequired,
}

export default PostSettingsDisableAlert
