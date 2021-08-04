import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/controlsPageCopy'

const DefaultSettingsSavedAlert = ({ show, setShowAlert }) => {
  // Define alert contents
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.settingsSaved} className="mb-0" />
  }, [])

  // SHOW ALERT
  const { showAlert, closeAlert } = useAlertModal()
  React.useEffect(() => {
    if (!show) return closeAlert()
    const buttons = [
      {
        text: 'Ok',
        onClick: () => {
          closeAlert()
          setShowAlert(false)
        },
        color: 'green',
      },
    ]
    showAlert({
      children: alertContents,
      buttons,
    })
  }, [show, alertContents, showAlert, closeAlert, setShowAlert])

  // HIDE ALERT WHEN UNMOUNTING
  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])
  // NO RENDER
  return null
}

DefaultSettingsSavedAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  setShowAlert: PropTypes.func.isRequired,
}

DefaultSettingsSavedAlert.defaultProps = {
}

export default DefaultSettingsSavedAlert
