import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'
import copy from '@/app/copy/PostsPageCopy'

const PostCardEditCaptionAlert = ({
  show,
  newCaption,
  updatePostDb,
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
          updatePostDb(newCaption, true)
          closeAlert()
        },
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: onCancel,
        color: 'black',
      },
    ]
    console.log('SHOW ALERT')
    showAlert({
      children: alertContents,
      buttons,
    })
  }, [show, newCaption, updatePostDb, onCancel, alertContents, closeAlert, showAlert])
  // NO RENDER
  return null
}

PostCardEditCaptionAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  newCaption: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  updatePostDb: PropTypes.func.isRequired,
}

PostCardEditCaptionAlert.defaultProps = {
  newCaption: '',
}

export default PostCardEditCaptionAlert
