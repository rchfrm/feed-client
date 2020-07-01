import React from 'react'

import brandColors from '@/constants/brandColors'

import Button from '@/elements/Button'
import FacebookIcon from '@/icons/FacebookIcon'

const ButtonFacebook = (props) => {
  const { version, children } = props
  const buttonEl = React.useRef()

  // Wait for a while then detect if button has been removed from DOM
  const [buttonRemoved, setButtonRemoved] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      const buttonRemoved = !buttonEl.current
      setButtonRemoved(buttonRemoved)
    }, 500)
  }, [setButtonRemoved])

  // Fallback
  if (buttonRemoved) {
    return (
      <div className="text--block">
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
      ref={buttonEl}
    >
      <FacebookIcon
        fill={brandColors.white}
        width="20"
      />
      {children}
    </Button>
  )
}

export default ButtonFacebook
