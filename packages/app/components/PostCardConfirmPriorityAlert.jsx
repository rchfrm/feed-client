import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/PostsPageCopy'

const PostCardConfirmPriorityAlert = ({
  show,
  onAlertConfirm,
  onCancel,
}) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.confirmPrioritisePost} className="mb-0" />
  }, [])

  // SHOW ALERT
  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (!show) return closeAlert()
    const buttons = [
      {
        text: 'Continue',
        onClick: () => {
          onAlertConfirm()
        },
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
        },
        color: 'black',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
      onClose: onCancel,
    })
  }, [show, onAlertConfirm, onCancel, alertContents, showAlert, closeAlert])

  // HIDE ALERT WHEN UNMOUNTING
  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])
  // NO RENDER
  return null
}

PostCardConfirmPriorityAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

PostCardConfirmPriorityAlert.defaultProps = {
}

export default PostCardConfirmPriorityAlert
