import React from 'react'
import PropTypes from 'prop-types'

import ClipboardJS from 'clipboard'

import ClipboardIcon from '@/icons/ClipboardIcon'

const CopyTextButton = ({
  label,
  text,
  size,
  className,
}) => {
  const buttonEl = React.useRef(null)
  React.useEffect(() => {
    const { current: button } = buttonEl
    const clipboard = new ClipboardJS(button)
    return () => {
      clipboard.destroy()
    }
  }, [])

  return (
    <>
      {/* LABEL */}
      {label && (
        <span className="inputLabel__text">
          <span>
            {label}
          </span>
        </span>
      )}
      <a
        className={[
          'inline-flex',
          size === 'large' ? 'h-buttonHeight' : null,
          size === 'large' ? 'items-center' : 'items-baseline',
          'justify-between',
          'button--copy-text',
          size === 'large' ? '-large' : null,
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
    </>
  )
}

CopyTextButton.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
}

CopyTextButton.defaultProps = {
  label: '',
  size: 'rg',
  className: '',
}


export default CopyTextButton
