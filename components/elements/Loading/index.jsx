import React from 'react'

function Loading(props) {
  const padding = props.noPadding ? '0' : '0 5%'
  const what = props.what ? ` ${props.what}` : ''
  return (
    <div
      className="loading"
      style={{
        padding,
      }}
    >
      <p className="full">
        Loading
        {what}
        ...
      </p>
    </div>
  )
}

export default Loading
