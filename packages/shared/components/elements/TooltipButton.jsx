import React from 'react'
import PropTypes from 'prop-types'

import TooltipIcon from '@/icons/TooltipIcon'
import TooltipMessage from '@/elements/TooltipMessage'

const TooltipButton = (props) => {
  const { buttonClasses, containerStyle, buttonText } = props
  const [showMessage, setShowMessage] = React.useState(false)
  // Get ref to message
  const messageRef = React.useRef(null)
  const setMessageRef = React.useCallback((el) => {
    messageRef.current = el
  }, [])
  // Toggle functions
  const buttonRef = React.useRef(null)
  const toggleMessage = () => setShowMessage(!showMessage)
  const closeMessage = ({ target }) => {
    if (!buttonRef.current || !messageRef.current) return
    // Ignore if clicking on tooltip button
    if (buttonRef.current.contains(target)) return
    // Ignore if clicking within message
    if (messageRef.current.contains(target)) return
    // Close the tooltip message
    setShowMessage(false)
  }
  // Listen clicks outside message to close
  React.useEffect(() => {
    if (showMessage) {
      window.addEventListener('click', closeMessage)
      return
    }
    window.removeEventListener('click', closeMessage)
    return () => {
      window.removeEventListener('click', closeMessage)
    }
  }, [showMessage])
  // Render
  return (
    <div className={['tooltip--container', buttonClasses].join(' ')} style={containerStyle}>
      {/* TOOLTIP TEXT */}
      {showMessage && <TooltipMessage {...props} messageRef={setMessageRef} />}
      {/* BUTTON */}
      <button className={['button', 'button--tooltip', buttonText && 'flex items-center'].join(' ')} onClick={toggleMessage} ref={buttonRef}>
        {/* BUTTON TEXT */}
        {buttonText && <p className="button--tooltip-text">{buttonText}</p>}
        <TooltipIcon className="button--tooltip-icon" />
      </button>
    </div>
  )
}

TooltipButton.propTypes = {
  buttonClasses: PropTypes.string,
  containerStyle: PropTypes.object,
  buttonText: PropTypes.string,
}

TooltipButton.defaultProps = {
  buttonClasses: '',
  containerStyle: {},
  buttonText: '',
}


export default TooltipButton
