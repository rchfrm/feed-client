import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const CONFIRMATION_BUTTON = ({ acceptAlert, text }) => {
  return (
    <Button
      version="green small"
      onClick={acceptAlert}
    >
      {text}
    </Button>
  )
}

const REJECTION_BUTTON = ({ resetAlert, text }) => {
  return (
    <Button
      version="black small"
      onClick={resetAlert}
    >
      {text}
    </Button>
  )
}

const AlertButtons = ({
  responseExpected,
  confirmationText = 'Ok',
  rejectionText = 'Cancel',
  resetAlert,
  acceptAlert,
}) => {
  // IF NO RESPONSE REQUIRED JUST SHOW CONFIRMATION BUTTON
  if (!responseExpected) {
    return (
      <CONFIRMATION_BUTTON
        acceptAlert={acceptAlert || resetAlert}
        text={confirmationText}
      />
    )
  }
  // ELSE SHOW BOTH BUTTONS
  return (
    <>
      <CONFIRMATION_BUTTON
        acceptAlert={acceptAlert}
        text={confirmationText}
      />
      <REJECTION_BUTTON
        resetAlert={resetAlert}
        text={rejectionText}
      />
    </>
  )
}


AlertButtons.propTypes = {
  responseExpected: PropTypes.bool,
  confirmationText: PropTypes.string,
  rejectionText: PropTypes.string,
  resetAlert: PropTypes.func.isRequired,
  acceptAlert: PropTypes.func,
}

AlertButtons.defaultProps = {
  responseExpected: false,
  confirmationText: 'Ok',
  rejectionText: 'Cancel',
  acceptAlert: null,
}


export default AlertButtons
