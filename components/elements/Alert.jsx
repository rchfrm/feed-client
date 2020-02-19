// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Button from './Button'
import Nothing from './Nothing'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS

function Alert({ contents, responseExpected, confirmationText, rejectionText, setAlert }) {
  // If there are no contents, display nothing
  if (!contents) {
    return <Nothing />
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
    <div className="alert-container">
      <div className="alert">

        <div className="alert-contents">
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

const AlertButtons = ({
  responseExpected,
  confirmationText = 'Ok',
  rejectionText = 'Cancel',
  resetAlert,
  positiveResponse,
}) => {
  if (responseExpected) {
    return (
      <div className="alert-buttons">
        <Button
          version="black progress"
          onClick={resetAlert}
          width={31.48}
        >
          {rejectionText}
        </Button>
        <Button
          version="black progress"
          onClick={positiveResponse}
          width={31.48}
        >
          {confirmationText}
        </Button>
      </div>
    )
  }
  return (
    <Button
      version="black progress"
      onClick={resetAlert}
      width={31.48}
    >
      {confirmationText}
    </Button>
  )
}
