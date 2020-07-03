/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

const TooltipMessage = ({ children, slides, direction, messageStyle, messageRef }) => {
  return (
    <div
      ref={messageRef}
      className={[
        // Tailwind classes
        'absolute',
        'w-64',
        'rounded-dialogue',
        'border-2',
        'border-solid',
        'border-green',
        'p-2',
        // Custom CSS
        'tooltip--message',
        `-${direction}`,
      ].join(' ')}
      style={messageStyle}
    >
      {children}
    </div>
  )
}

TooltipMessage.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf([
    'top', 'left', 'bottom', 'right',
  ]),
  messageStyle: PropTypes.object,
}

TooltipMessage.defaultProps = {
  direction: 'left',
  messageStyle: {},
}


export default TooltipMessage
