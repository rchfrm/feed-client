import React from 'react'
import PropTypes from 'prop-types'

import TooltipIcon from '@/icons/TooltipIcon'
import TooltipMessage from '@/elements/TooltipMessage'

const ButtonTooltip = (props) => {
  const { className, containerStyle } = props
  const [showMessage, setShowMessage] = React.useState(false)
  // Toggle functions
  const toggleMessage = () => setShowMessage(!showMessage)
  const closeMessage = () => setShowMessage(false)
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
    <div className={['tooltip--container', className].join(' ')} style={containerStyle}>
      {showMessage && <TooltipMessage {...props} />}
      <button className={['button', 'button--tooltip'].join(' ')} onClick={toggleMessage}>
        <TooltipIcon />
      </button>
    </div>
  )
}

ButtonTooltip.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,
}

ButtonTooltip.defaultProps = {
  className: '',
  containerStyle: {},
}


export default ButtonTooltip
