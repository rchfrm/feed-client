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
  updatePostDb,
  runResetCaption,
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
          const caption = runResetCaption ? null : newCaption
          updatePostDb(caption, true)
          closeAlert()
        },
        color: 'green',
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
        color: 'black',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, newCaption, updatePostDb, postId, originalCaption, onCancel])
  // NO RENDER
  return null
}

PostCardEditCaptionAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  newCaption: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  updatePostDb: PropTypes.func.isRequired,
  runResetCaption: PropTypes.bool,
}

PostCardEditCaptionAlert.defaultProps = {
  newCaption: '',
  runResetCaption: false,
}

export default PostCardEditCaptionAlert
