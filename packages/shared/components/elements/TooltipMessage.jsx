/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import { Portal } from 'react-portal'

import MarkdownText from '@/elements/MarkdownText'
import TooltipSlides from '@/TooltipSlides'

import useBrowserStore from '@/hooks/useBrowserStore'
import useGetBreakpointWidth from '@/hooks/useGetBreakpointWidth'

// GET POSITION
// ------------
const getPositionAndWidth = ({
  buttonEl,
  messageEl,
  arrowEl,
  direction,
  defaultWidth,
  windowWidth,
  xsWidth,
}) => {
  const sideGap = 16
  const gap = 8
  const buttonBoundingClient = buttonEl.getBoundingClientRect()
  const messageWidth = messageEl.offsetWidth
  let { top: buttonTop, left: buttonLeft } = buttonBoundingClient
  const { width: buttonWidth, height: buttonHeight } = buttonBoundingClient
  // Adjust button top by scroll position
  buttonTop += window.scrollY
  buttonLeft += window.scrollX
  // Force direction as top for screens below xs
  if (windowWidth < xsWidth) {
    direction = 'bottom'
  }
  let top
  let left
  let width = defaultWidth
  if (direction === 'top' || direction === 'bottom') {
    left = buttonLeft + (buttonWidth / 2) - (messageWidth / 2)
  }
  if (direction === 'top') {
    top = buttonTop - gap
  }
  if (direction === 'bottom') {
    top = buttonTop + buttonHeight + gap
  }
  // TODO bottom
  if (direction === 'left' || direction === 'right') {
    top = buttonTop + (buttonWidth / 2)
  }
  if (direction === 'left') {
    left = buttonLeft - (buttonWidth / 2) - messageWidth + (gap * 1)
  }
  if (direction === 'right') {
    left = buttonLeft + buttonWidth + gap
  }
  // If window width is less than max width, fix to center
  // And move arrow
  if (left <= sideGap) {
    left = sideGap
    width = Math.min(defaultWidth, windowWidth - (sideGap * 2))
    arrowEl.style.left = `${buttonLeft - 1}px`
  // Else reset arrow
  } else {
    arrowEl.style.left = null
  }
  return { top, left, width }
}

const TooltipMessage = ({
  copy,
  slides,
  slidesContentAfter,
  direction,
  messageClass,
  messageStyle,
  buttonRef,
  messageRef,
}) => {
  const [ready, setReady] = React.useState(false)
  // Get width of xs breakpoint
  const xsWidth = useGetBreakpointWidth('xs')
  // Define message el
  const messageNode = React.useRef(null)
  const setMessageRef = React.useCallback((el) => {
    // Set ref in parent
    messageRef(el)
    // Set ref here
    messageNode.current = el
  }, [messageRef])
  // Define arrow ref
  const arrowRef = React.useRef(null)
  // Get window width
  const { width: windowWidth } = useBrowserStore()
  // Update width to make sure it's not too big
  const defaultStyle = { width: 300, opacity: 0 }
  const [style, setStyle] = React.useState(defaultStyle)
  React.useEffect(() => {
    const { current: buttonEl } = buttonRef
    const { current: messageEl } = messageNode
    // GET POSITION
    const { left, top, width } = getPositionAndWidth({
      buttonEl,
      messageEl,
      arrowEl: arrowRef.current,
      direction,
      defaultWidth: defaultStyle.width,
      windowWidth,
      xsWidth,
    })
    const style = { ...defaultStyle, left, top, width, opacity: 1, zIndex: 10 }
    // If screen is big enough set to default style
    setStyle(style)
    // Set as ready
    setReady(true)
  // eslint-disable-next-line
  }, [windowWidth])
  return (
    <Portal>
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
          'text-sm',
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
        {(ready && (slides || slidesContentAfter) && slides.length > 1) && style ? (
          <TooltipSlides slides={slides} slidesContentAfter={slidesContentAfter} />
        ) : (
          <MarkdownText markdown={copy || slides[0]} />
        )}
        {/* ARROW */}
        <div
          ref={arrowRef}
          className={[
            'tooltip--arrow',
          ].join(' ')}
        />
      </div>
    </Portal>
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
  buttonRef: PropTypes.object.isRequired,
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
