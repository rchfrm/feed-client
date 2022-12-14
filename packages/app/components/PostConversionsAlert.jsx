import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import useAlertModal from '@/hooks/useAlertModal'
import useControlsStore from '@/app/stores/controlsStore'
import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
})

const PostConversionsAlert = ({
  show,
  onAlertConfirm,
  onCancel,
}) => {
  const { canRunConversions } = useControlsStore(getControlsStoreState)

  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.conversionsToggleAlert(canRunConversions)} />
  }, [canRunConversions])

  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (! show) return closeAlert()
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

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

PostConversionsAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onAlertConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default PostConversionsAlert
