// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import AlertButtons from './AlertButtons'

function Alert({
  contents,
  responseExpected,
  confirmationText,
  rejectionText,
  resetAlert,
  acceptAlert,
}) {
  // If there are no contents, display nothing
  if (!contents) {
    return null
  }

  return (
    <div className="alert--container">

      <div className="alert">

        <div className="alert--contents">
          {contents}
        </div>

        <AlertButtons
          confirmationText={confirmationText}
          acceptAlert={acceptAlert}
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
  // Function, required if content
  resetAlert(props, propName, componentName) {
    if ((props.contents && (props[propName] === undefined || typeof (props[propName]) !== 'function'))) {
      return new Error(`Please provide a ${propName} function to the ${componentName} component!`)
    }
  },
  // Function, required if content
  acceptAlert(props, propName, componentName) {
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
  resetAlert: null,
  acceptAlert: null,
}

export default Alert
