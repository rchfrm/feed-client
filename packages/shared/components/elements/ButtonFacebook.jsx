import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

import Button from '@/elements/Button'
import FacebookIcon from '@/icons/FacebookIcon'

const ButtonFacebook = ({
  className,
  onClick,
  version,
  children,
  fbButtonFallbackClassName,
  fallbackCta,
}) => {
  const buttonRef = React.useRef()

  // Wait for a while then detect if button has been removed from DOM
  const [buttonRemoved, setButtonRemoved] = React.useState(false)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { current: buttonEl } = buttonRef
      const buttonRemoved = !buttonEl || !buttonEl.getBoundingClientRect().height
      setButtonRemoved(buttonRemoved)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [setButtonRemoved])

  // Fallback
  if (buttonRemoved) {
    return (
      <div className={`text--block ${fbButtonFallbackClassName}`}>
        <p>It looks like your ad-blocker removed a button.</p>
        <p>
          <a
            role="button"
            onClick={(e) => {
              e.preventDefault()
              onClick()
            }}
          >
            Click here instead to <strong>{fallbackCta}</strong>
          </a>.
        </p>
        <p>If that doesn't work, email us: <a href="mailto:help@tryfeed.co">help@tryfeed.co</a></p>
      </div>
    )
  }

  return (
    <Button
      onClick={onClick}
      className={className}
      version={['facebook', 'icon', version].join(' ')}
      ref={buttonRef}
      icon={(
        <FacebookIcon fill={brandColors.white} />
      )}
      spinnerFill={brandColors.white}
    >
      {children}
    </Button>
  )
}

ButtonFacebook.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  fallbackCta: PropTypes.string.isRequired,
  version: PropTypes.string,
  children: PropTypes.node.isRequired,
  fbButtonFallbackClassName: PropTypes.string,
}

ButtonFacebook.defaultProps = {
  className: '',
  onClick: () => {},
  version: null,
  fbButtonFallbackClassName: '',
}

export default ButtonFacebook
