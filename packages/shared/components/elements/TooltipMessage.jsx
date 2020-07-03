/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import TooltipSlides from '@/TooltipSlides'

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
        // Handle slides
        slides ? 'pb-8' : '',
      ].join(' ')}
      style={messageStyle}
    >
      {slides ? (
        <TooltipSlides slides={slides} />
      ) : children}
    </div>
  )
}

TooltipMessage.propTypes = {
  children: PropTypes.node,
  slides: PropTypes.array,
  direction: PropTypes.oneOf([
    'top', 'left', 'bottom', 'right',
  ]),
  messageStyle: PropTypes.object,
  messageRef: PropTypes.object,
}

TooltipMessage.defaultProps = {
  children: null,
  slides: null,
  direction: 'left',
  messageStyle: {},
  messageRef: null,
}


export default TooltipMessage
