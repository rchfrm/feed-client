/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import TooltipSlides from '@/TooltipSlides'

import useBrowserStore from '@/hooks/useBrowserStore'

const getRestrictedWith = ({ direction, windowWidth, sideGap, distanceFromLeft, distanceFromRight }) => {
  if (direction === 'left') return windowWidth - (sideGap + distanceFromRight)
  if (direction === 'right' || direction === 'top') return windowWidth - (distanceFromLeft + sideGap)
}

const TooltipMessage = ({
  copy,
  slides,
  slidesContentAfter,
  direction,
  messageClass,
  messageStyle,
  messageRef,
}) => {
  // Define message el
  const messageNode = React.useRef(null)
  const setMessageRef = React.useCallback((el) => {
    // Set ref in parent
    messageRef(el)
    // Set ref here
    messageNode.current = el
  }, [messageRef])
  // Get window width
  const { width: windowWidth } = useBrowserStore()
  // Update width to make sure it's not too big
  const defaultStyle = { width: 300 }
  const [style, setStyle] = React.useState(defaultStyle)
  React.useEffect(() => {
    const { current: messageEl } = messageNode
    const sideGap = 20
    const { left: distanceFromLeft, right } = messageEl.getBoundingClientRect()
    const { width: defaultWidth } = defaultStyle
    const distanceFromRight = direction === 'left' ? windowWidth - right : right
    const isTooBig = windowWidth - (distanceFromRight + defaultWidth) < sideGap
    if (isTooBig) {
      // If screen is too narrow, set width to fit
      const newWidth = getRestrictedWith({ direction, windowWidth, sideGap, distanceFromLeft, distanceFromRight })
      const width = newWidth ? Math.min(newWidth, defaultWidth) : defaultWidth
      // Set width
      setStyle({ ...defaultStyle, width })
      return
    }
    // If screen is big enough set to default style
    setStyle(defaultStyle)
  // eslint-disable-next-line
  }, [windowWidth])
  return (
    <div
      ref={setMessageRef}
      className={[
        // Tailwind classes
        'absolute',
        'rounded-dialogue',
        'border-2',
        'border-solid',
        'border-green',
        'p-3',
        // Custom CSS
        'tooltip--message',
        `-${direction}`,
        // Handle slides
        slides ? 'pb-8' : '',
        // Add class from prop
        messageClass,
      ].join(' ')}
      style={{ ...style, ...messageStyle }}
    >
      {((slides || slidesContentAfter) && slides.length > 1) && style ? (
        <TooltipSlides slides={slides} slidesContentAfter={slidesContentAfter} />
      ) : (
        <MarkdownText markdown={copy || slides[0]} />
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
