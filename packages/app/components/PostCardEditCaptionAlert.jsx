import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import { track } from '@/app/helpers/trackingHelpers'

import copy from '@/app/copy/PostsPageCopy'

const PostCardEditCaptionAlert = ({
  show,
  newCaption,
  originalCaption,
  onAlertConfirm,
  postId,
  onCancel,
}) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.confirmEditCaption} className="mb-0" />
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
          closeAlert()
        },
        color: 'black',
      },
      {
        text: 'Cancel',
        onClick: () => {
          track('edit_caption_cancel', {
            postId,
            originalCaption,
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
  }, [show, newCaption, onAlertConfirm, postId, originalCaption, onCancel, alertContents, showAlert, closeAlert])

  // HIDE ALERT WHEN UNMOUNTING
  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])
  // NO RENDER
  return null
}

PostCardEditCaptionAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  newCaption: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
}

PostCardEditCaptionAlert.defaultProps = {
  newCaption: '',
}

export default PostCardEditCaptionAlert
