import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'
import Button from '@/elements/Button'
import FacebookIcon from '@/icons/FacebookIcon'

const ButtonFacebook = ({
  className,
  href,
  onClick,
  children,
  fallbackCta,
  trackComponentName,
}) => {
  const buttonRef = React.useRef()

  // Wait for a while then detect if button has been removed from DOM
  const [buttonRemoved, setButtonRemoved] = React.useState(false)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { current: buttonEl } = buttonRef
      const buttonRemoved = ! buttonEl || ! buttonEl.getBoundingClientRect().height
      setButtonRemoved(buttonRemoved)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [setButtonRemoved])

  // Fallback
  if (buttonRemoved) {
    return (
      <div className="text--block">
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
      href={href}
      version="custom"
      onClick={onClick}
      className={[className, 'relative bg-fb border-fb hover:bg-fb hover:border-fb hover:bg-opacity-90 text-offwhite'].join(' ')}
      ref={buttonRef}
      spinnerFill={brandColors.offwhite}
      trackComponentName={trackComponentName}
    >
      <FacebookIcon className="w-5 h-auto absolute top-50 left-4" fill={brandColors.offwhite} />
      {children}
    </Button>
  )
}

ButtonFacebook.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  fallbackCta: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  trackComponentName: PropTypes.string,
}

ButtonFacebook.defaultProps = {
  className: '',
  onClick: () => {},
  href: '',
  trackComponentName: '',
}

export default ButtonFacebook
