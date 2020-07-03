import React from 'react'
import PropTypes from 'prop-types'

import TooltipIcon from '@/icons/TooltipIcon'
import TooltipMessage from '@/elements/TooltipMessage'

const ButtonTooltip = (props) => {
  const { buttonClasses, containerStyle } = props
  const [showMessage, setShowMessage] = React.useState(false)
  // Get ref to message
  const messageRef = React.useRef(null)
  const setMessageRef = (el) => {
    messageRef.current = el
  }
  // Toggle functions
  const toggleMessage = () => setShowMessage(!showMessage)
  const closeMessage = ({ target }) => {
    if (messageRef.current && messageRef.current.contains(target)) {
      return
    }
    setShowMessage(false)
  }
  // Listen clicks outside message to close
  React.useEffect(() => {
    if (showMessage) {
      window.addEventListener('click', closeMessage, { once: true })
      return
    }
    window.removeEventListener('click', closeMessage, { once: true })
    return () => {
      window.removeEventListener('click', closeMessage, { once: true })
    }
  }, [showMessage])
  // Render
  return (
    <div className={['tooltip--container', buttonClasses].join(' ')} style={containerStyle}>
      {showMessage && <TooltipMessage {...props} messageRef={setMessageRef} />}
      <button className={['button', 'button--tooltip'].join(' ')} onClick={toggleMessage}>
        <TooltipIcon />
      </button>
    </div>
  )
}

ButtonTooltip.propTypes = {
  buttonClasses: PropTypes.string,
  containerStyle: PropTypes.object,
}

ButtonTooltip.defaultProps = {
  buttonClasses: '',
  containerStyle: {},
}


export default ButtonTooltip
