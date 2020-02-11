import React from 'react'

import './nextbutton.css'

function NextButton(props) {
  return (
    <button
      disabled={props.disabled}
      className="nextbutton"
      onClick={props.onClick}
      style={{
        float: props.position,
      }}
    >
      {props.children}
    </button>
  )
}

export default NextButton
