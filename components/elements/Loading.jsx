import React from 'react'
import Ellipsis from './Ellipsis'

function Loading({ noPadding, what }) {
  const padding = noPadding ? '0' : '0 5%'
  const whatString = what ? ` ${what}` : ''
  return (
    <div
      className="loading"
      style={{
        padding,
      }}
    >
      <p className="full">
        Loading
        {whatString}
        <Ellipsis />
      </p>
    </div>
  )
}

export default Loading
