import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

const PostCardToggleAlert = ({
  show,
  onAlertConfirm,
  onCancel,
}) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <p>Would you like to set-up conversion campaigns now?</p>
  }, [])

  // SHOW ALERT
  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (!show) return closeAlert()
    const buttons = [
      {
        text: 'Yes',
        onClick: () => {
          onAlertConfirm()
        },
        color: 'green',
      },
      {
        text: 'No',
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

PostCardToggleAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

PostCardToggleAlert.defaultProps = {
}

export default PostCardToggleAlert
