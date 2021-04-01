import React from 'react'

import brandColors from '@/constants/brandColors'

import Button from '@/elements/Button'
import FacebookIcon from '@/icons/FacebookIcon'

const ButtonFacebook = (props) => {
  const { version, children, fbButtonFallbackClassName = '' } = props
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
        <p>Can't see the button? <a href="#" onClick={props.onClick}>Click here instead</a>.</p>
        <p>Still no button? Try disabling your ad blocker and refresh the page.</p>
        <p>If that doesn't work, email us: <a href="mailto:help@tryfeed.co">help@tryfeed.co</a></p>
      </div>
    )
  }

  return (
    <Button
      {...props}
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

export default ButtonFacebook
