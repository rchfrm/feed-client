import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/PostsPageCopy'

const PostCardDisableAlert = ({
  show,
  onConfirm,
  onCancel,
  campaignType,
}) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.postStatusConfirmation(campaignType)} className="mb-0" />
  }, [campaignType])

  // SHOW ALERT
  const { showAlert, closeAlert } = useAlertModal()
  React.useEffect(() => {
    if (!show) return closeAlert()
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

  // HIDE ALERT WHEN UNMOUNTING
  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])
  // NO RENDER
  return null
}

PostCardDisableAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

PostCardDisableAlert.defaultProps = {
}

export default PostCardDisableAlert
