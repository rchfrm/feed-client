import React from 'react'
import PropTypes from 'prop-types'

import ClipboardJS from 'clipboard'

import ClipboardIcon from '@/icons/ClipboardIcon'

const CopyTextButton = ({ text, className }) => {
  const buttonEl = React.useRef(null)
  React.useEffect(() => {
    const { current: button } = buttonEl
    const clipboard = new ClipboardJS(button)
    return () => {
      clipboard.destroy()
    }
  }, [])

  return (
    <a
      className={[
        'inline-flex',
        'items-baseline',
        'button--copy-text',
        className,
      ].join(' ')}
      role="button"
      title={`Copy ${text} to clipboard`}
      ref={buttonEl}
      data-clipboard-text={text}
    >
      <span className="text mr-2">{text}</span>
      <ClipboardIcon className="icon" />
    </a>
  )
}

CopyTextButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

CopyTextButton.defaultProps = {
  className: '',
}


export default CopyTextButton
