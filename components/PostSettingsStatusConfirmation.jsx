import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Alert, { alertReducer, initialAlertState } from '@/elements/Alert'

import copy from '@/copy/PostsPageCopy'

function ConfirmationContent() {
  return (
    <>
      <h2>Are you sure?</h2>
      <MarkdownText markdown={copy.globalStatusConfirmation} />
    </>
  )
}


const PostSettingsStatusConfirmation = ({
  setConfirmation,
  triggerStatusUpdate,
}) => {
  // DEFINE ALERT STATE
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  React.useEffect(() => {
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <ConfirmationContent />,
      },
    })
  }, [])
  // DEFINE ALERT RESPONSES
  const resetAlert = () => {
    setConfirmation(false)
    triggerStatusUpdate(false)
  }
  const acceptAlert = () => {
    triggerStatusUpdate(true)
    setConfirmation(false)
  }

  return (
    <Alert
      confirmationText={alert.confirmationText}
      contents={alert.contents}
      rejectionText={alert.rejectionText}
      responseExpected={alert.responseExpected}
      resetAlert={resetAlert}
      acceptAlert={acceptAlert}
    />
  )
}

PostSettingsStatusConfirmation.propTypes = {
  setConfirmation: PropTypes.func.isRequired,
  triggerStatusUpdate: PropTypes.func.isRequired,
}

export default PostSettingsStatusConfirmation
