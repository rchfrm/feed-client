import React from 'react'
import PropTypes from 'prop-types'

import TooltipIcon from '@/icons/TooltipIcon'
import TooltipMessage from '@/elements/TooltipMessage'

import { track } from '@/helpers/trackingHelpers'

const TooltipButton = (props) => {
  const { buttonClasses, buttonStyle, buttonText, trackLabel, trackLocation } = props
  const [showMessage, setShowMessage] = React.useState(false)
  // Get ref to message
  const messageRef = React.useRef(null)
  const setMessageRef = React.useCallback((el) => {
    messageRef.current = el
  }, [])
  // Toggle functions
  const buttonRef = React.useRef(null)
  const toggleMessage = (e) => {
    e.preventDefault()
    setShowMessage(!showMessage)
    track('tooltip_clicked', {
      action: !showMessage ? 'show' : 'hide',
      label: trackLabel,
      location: trackLocation,
    })
  }
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
    <div className={['tooltip--container', buttonClasses].join(' ')} style={buttonStyle}>
      {/* TOOLTIP TEXT */}
      {showMessage && <TooltipMessage {...props} messageRef={setMessageRef} buttonRef={buttonRef} />}
      {/* BUTTON */}
      <a
        role="button"
        onClick={toggleMessage}
        ref={buttonRef}
        tabIndex="-1"
      >
        {/* BUTTON TEXT */}
        {buttonText && <p className="button--tooltip-text text-sm">{buttonText}</p>}
        <TooltipIcon className="button--tooltip-icon" />
      </a>
    </div>
  )
}

TooltipButton.propTypes = {
  buttonClasses: PropTypes.string,
  buttonStyle: PropTypes.object,
  buttonText: PropTypes.string,
  trackLabel: PropTypes.string,
  trackLocation: PropTypes.string,
}

TooltipButton.defaultProps = {
  buttonClasses: '',
  buttonStyle: null,
  buttonText: '',
  trackLabel: '',
  trackLocation: '',
}


export default TooltipButton
