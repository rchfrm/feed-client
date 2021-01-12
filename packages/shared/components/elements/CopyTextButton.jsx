import React from 'react'
import PropTypes from 'prop-types'

import ClipboardJS from 'clipboard'

import ClipboardIcon from '@/icons/ClipboardIcon'

const CopyTextButton = ({
  label,
  text,
  size,
  onCopied,
  className,
}) => {
  const button = React.useRef(null)

  const [success, setSuccess] = React.useState(false)
  const onSuccess = React.useCallback(() => {
    setSuccess(true)
    onCopied(text)
    setTimeout(() => {
      if (!button.current) return
      setSuccess(false)
    }, 800)
  }, [onCopied, text])
  React.useEffect(() => {
    const clipboard = new ClipboardJS(button.current)
    clipboard.on('success', onSuccess)
    return () => {
      clipboard.destroy()
    }
  }, [onSuccess])

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
        ref={button}
        data-clipboard-text={text}
      >
        <span className="text mr-2">
          {success ? 'Copied!' : text}
        </span>
        <ClipboardIcon className="icon" />
      </a>
    </>
  )
}

CopyTextButton.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  onCopied: PropTypes.func,
  className: PropTypes.string,
}

CopyTextButton.defaultProps = {
  label: '',
  size: 'rg',
  onCopied: () => {},
  className: '',
}


export default CopyTextButton
