// IMPORT PACKAGES
import React from 'react'
import AlertButtons from './AlertButtons'

function Alert({ contents, responseExpected, confirmationText, rejectionText, setAlert }) {
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

export default Alert
