import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
})

const PostCardToggleAlert = ({
  show,
  onAlertConfirm,
  onCancel,
}) => {
  const { canRunConversions } = useControlsStore(getControlsStoreState)
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.conversionsToggleAlert(canRunConversions)} />
  }, [canRunConversions])

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
