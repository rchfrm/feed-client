
import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'
import { track } from '@/helpers/trackingHelpers'
import copy from '@/app/copy/PostsPageCopy'

const PostSettingsEditAlert = ({
  type,
  show,
  oldValue,
  newValue,
  onAlertConfirm,
  postId,
  onCancel,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.confirmEdit(type)} className="mb-0" />
  }, [type])

  React.useEffect(() => {
    if (! show) return closeAlert()
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
            oldValue,
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
  }, [show, newValue, onAlertConfirm, postId, oldValue, onCancel, alertContents, showAlert, closeAlert, type])

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

PostSettingsEditAlert.propTypes = {
  type: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  newValue: PropTypes.string,
  oldValue: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
}

PostSettingsEditAlert.defaultProps = {
  newValue: '',
  oldValue: '',
}

export default PostSettingsEditAlert
