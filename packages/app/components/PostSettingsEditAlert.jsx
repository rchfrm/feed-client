import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'
import copy from '@/app/copy/PostsPageCopy'

const PostSettingsEditAlert = ({
  type,
  shouldShowAlert,
  onConfirm,
  onCancel,
}) => {
  const { showAlert, closeAlert } = useAlertModal()

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.confirmEdit(type)} className="mb-0" />
  }, [type])

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
        color: 'black',
      },
      {
        text: 'Cancel',
        onClick: () => {
          onCancel()
        },
        color: 'red',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
    })
  }, [shouldShowAlert, onConfirm, onCancel, alertContents, showAlert, closeAlert, type])

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

PostSettingsEditAlert.propTypes = {
  type: PropTypes.string.isRequired,
  shouldShowAlert: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default PostSettingsEditAlert
