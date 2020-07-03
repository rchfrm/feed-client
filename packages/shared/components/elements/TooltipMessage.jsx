/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import TooltipSlides from '@/TooltipSlides'

const TooltipMessage = ({
  copy,
  slides,
  slidesContentAfter,
  direction,
  messageStyle,
  messageRef,
}) => {
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
      {slides || slidesContentAfter ? (
        <TooltipSlides slides={slides} slidesContentAfter={slidesContentAfter} />
      ) : (
        <MarkdownText markdown={copy} />
      )}
    </div>
  )
}

TooltipMessage.propTypes = {
  copy: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.string),
  slidesContentAfter: PropTypes.arrayOf(PropTypes.node),
  direction: PropTypes.oneOf([
    'top', 'left', 'bottom', 'right',
  ]),
  messageStyle: PropTypes.object,
  messageRef: PropTypes.func,
}

TooltipMessage.defaultProps = {
  copy: '',
  slides: null,
  slidesContentAfter: null,
  direction: 'left',
  messageStyle: {},
  messageRef: () => {},
}


export default TooltipMessage
