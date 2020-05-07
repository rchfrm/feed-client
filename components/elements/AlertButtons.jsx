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
        version="black"
        onClick={resetAlert}
        style={{
          width: '31.48%',
        }}
      >
        {responseExpected ? rejectionText : confirmationText}
      </Button>
      {responseExpected && (
        <Button
          version="black"
          onClick={acceptAlert || resetAlert}
          style={{
            width: '31.48%',
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
