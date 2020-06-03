import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const AlertButtons = ({
  responseExpected,
  confirmationText = 'Ok',
  rejectionText = 'Cancel',
  resetAlert,
  acceptAlert,
}) => {
  return (
    <>
      <Button
        version="black small"
        onClick={resetAlert}
        style={{
          minWidth: '10rem',
        }}
      >
        {responseExpected ? rejectionText : confirmationText}
      </Button>
      {responseExpected && (
        <Button
          version="black small"
          onClick={acceptAlert || resetAlert}
          style={{
            minWidth: '10rem',
          }}
        >
          {confirmationText}
        </Button>
      )}
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
