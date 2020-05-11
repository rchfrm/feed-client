import React from 'react'

function NextButton({ disabled, onClick, position, children }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="nextbutton"
      onClick={onClick}
      style={{
        float: position,
      }}
    >
      {children}
    </button>
  )
}

export default NextButton
