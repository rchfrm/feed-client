import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const AlertButtons = ({
  responseExpected,
  confirmationText = 'Ok',
  rejectionText = 'Cancel',
  resetAlert,
  positiveResponse,
}) => {
  return (
    <div className="alert--buttons">
      <Button
        version="black"
        onClick={resetAlert}
        width={31.48}
      >
        {responseExpected ? rejectionText : confirmationText}
      </Button>
      {responseExpected && (
        <Button
          version="black"
          onClick={positiveResponse || resetAlert}
          width={31.48}
        >
          {confirmationText}
        </Button>
      )}
    </div>
  )
}


AlertButtons.propTypes = {
  responseExpected: PropTypes.bool,
  confirmationText: PropTypes.string,
  rejectionText: PropTypes.string,
  resetAlert: PropTypes.func.isRequired,
  positiveResponse: PropTypes.func,
}

AlertButtons.defaultProps = {
  responseExpected: false,
  confirmationText: 'Ok',
  rejectionText: 'Cancel',
  positiveResponse: null,
}


export default AlertButtons
