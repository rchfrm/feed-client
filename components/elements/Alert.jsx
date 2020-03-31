// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import AlertButtons from './AlertButtons'

const ButtonEls = ({
  responseExpected,
  confirmationText,
  rejectionText,
  acceptAlert,
  resetAlert,
}) => {
  return (
    <AlertButtons
      responseExpected={responseExpected}
      confirmationText={confirmationText}
      rejectionText={rejectionText}
      acceptAlert={acceptAlert}
      resetAlert={resetAlert}
    />
  )
}

function Alert(props) {
  // Extract props
  const {
    contents,
    buttons,
    resetAlert,
  } = props

  // If there are no contents, display nothing
  if (!contents) {
    return null
  }

  const buttonEls = buttons || <ButtonEls {...props} />

  return (
    <div className="alert--container">

      <button
        className="alert--bg"
        label="Close alert"
        onClick={resetAlert}
      />

      <div className="alert">

        <div className="alert--contents">
          {contents}
        </div>

        <div className="alert--buttons">
          {buttonEls}
        </div>

      </div>
    </div>
  )
}

Alert.propTypes = {
  contents: PropTypes.node,
  buttons: PropTypes.node,
  // Function, required if content
  resetAlert(props, propName, componentName) {
    if ((props.contents && (props[propName] === undefined || typeof (props[propName]) !== 'function'))) {
      return new Error(`Please provide a ${propName} function to the ${componentName} component!`)
    }
  },
  // Function, required if content
  acceptAlert(props, propName, componentName) {
    if ((props.contents && props.button && (props[propName] === undefined || typeof (props[propName]) !== 'function'))) {
      return new Error(`Please provide a ${propName} function to the ${componentName} component!`)
    }
  },
}

Alert.defaultProps = {
  contents: null,
  buttons: null,
  resetAlert: null,
  acceptAlert: null,
}

export default Alert
