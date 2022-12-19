import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'
import copy from '@/app/copy/PostsPageCopy'

const PostSettingsDisableAlert = ({
  show,
  onConfirm,
  onCancel,
  campaignType,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.postStatusConfirmation(campaignType)} className="mb-0" />
  }, [campaignType])

  React.useEffect(() => {
    if (! show) return closeAlert()
    const buttons = [
      {
        text: 'Ok',
        onClick: () => {
          onConfirm()
          closeAlert()
        },
        color: 'black',
      },
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
          closeAlert()
        },
        color: 'red',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
    })
  }, [show, onConfirm, onCancel, alertContents, showAlert, closeAlert])

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

PostSettingsDisableAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

export default PostSettingsDisableAlert
