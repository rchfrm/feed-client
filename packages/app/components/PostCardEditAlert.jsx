import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import { track } from '@/helpers/trackingHelpers'

import copy from '@/app/copy/PostsPageCopy'

const PostCardEditCaptionAlert = ({
  type,
  show,
  newValue,
  originalValue,
  onAlertConfirm,
  postId,
  onCancel,
}) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.confirmEdit(type)} className="mb-0" />
  }, [type])

  // SHOW ALERT
  const { showAlert, closeAlert } = useAlertModal()
  React.useEffect(() => {
    if (!show) return closeAlert()
    const buttons = [
      {
        text: 'Continue',
        onClick: () => {
          onAlertConfirm()
          closeAlert()
        },
        color: 'black',
      },
      {
        text: 'Cancel',
        onClick: () => {
          track(`edit_${type}_cancel`, {
            postId,
            originalValue,
          })
          onCancel()
        },
        color: 'red',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
    })
  }, [show, newValue, onAlertConfirm, postId, originalValue, onCancel, alertContents, showAlert, closeAlert, type])

  // HIDE ALERT WHEN UNMOUNTING
  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])
  // NO RENDER
  return null
}

PostCardEditCaptionAlert.propTypes = {
  type: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  newValue: PropTypes.string,
  originalValue: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
}

PostCardEditCaptionAlert.defaultProps = {
  newValue: '',
  originalValue: '',
}

export default PostCardEditCaptionAlert
