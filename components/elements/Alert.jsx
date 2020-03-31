// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import AlertButtons from './AlertButtons'

function Alert({
  contents,
  responseExpected,
  confirmationText,
  rejectionText,
  setAlert,
}) {
  // If there are no contents, display nothing
  if (!contents) {
    return null
  }

  // FUNCTIONS
  const resetAlert = e => {
    e.preventDefault()
    setAlert({ type: 'reset-alert' })
  }

  const positiveResponse = e => {
    e.preventDefault()
    setAlert({ type: 'set-positive-response' })
  }
  // END FUNCTIONS

  return (
    <div className="alert--container">

      <div className="alert">

        <div className="alert--contents">
          {contents}
        </div>

        <AlertButtons
          confirmationText={confirmationText}
          positiveResponse={positiveResponse}
          rejectionText={rejectionText}
          resetAlert={resetAlert}
          responseExpected={responseExpected}
        />

      </div>
    </div>
  )
}

Alert.propTypes = {
  contents: PropTypes.node,
  responseExpected: PropTypes.bool,
  confirmationText: PropTypes.string,
  rejectionText: PropTypes.string,
  setAlert(props, propName, componentName) {
    if ((props.contents && (props[propName] === undefined || typeof (props[propName]) !== 'function'))) {
      return new Error(`Please provide a ${propName} function to the ${componentName} component!`)
    }
  },
}

Alert.defaultProps = {
  contents: null,
  responseExpected: false,
  confirmationText: 'Ok',
  rejectionText: 'Cancel',
  setAlert: () => {},
}

export default Alert
