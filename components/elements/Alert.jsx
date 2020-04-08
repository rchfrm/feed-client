// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import CloseCircle from '../icons/CloseCircle'
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

      <div className="alert--inner">

        {/* Close button */}
        <button
          onClick={resetAlert}
          className="alert_close--button  button--close"
          label="Close"
        >
          <CloseCircle />
        </button>

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


// EXTRA EXPORTS
// -------------
export const initialAlertState = {
  contents: undefined,
  responseExpected: true,
  confirmationText: 'Yes.',
  rejectionText: 'No.',
  response: false,
}

export const alertReducer = (alertState, alertAction) => {
  switch (alertAction.type) {
    case 'show-alert':
      return {
        ...alertState,
        contents: alertAction.payload.contents,
      }

    case 'reset-alert':
      return initialAlertState

    case 'set-positive-response':
      return {
        ...alertState,
        contents: undefined,
        response: true,
      }

    default:
      throw new Error(`Could not find ${alertAction.type} in alertReducer`)
  }
}
