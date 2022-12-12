import React from 'react'
import PropTypes from 'prop-types'

import ClipboardJS from 'clipboard'

import ClipboardIcon from '@/icons/ClipboardIcon'

const CopyTextButton = ({
  label,
  text,
  textAlt,
  size,
  type,
  onCopied,
  className,
}) => {
  const button = React.useRef(null)

  const [success, setSuccess] = React.useState(false)
  const onSuccess = React.useCallback(() => {
    setSuccess(true)
    onCopied(text)
    setTimeout(() => {
      if (! button.current) return
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
          'button--copy-text',
          'inline-flex relative',
          size === 'large' ? 'h-buttonHeight' : null,
          size === 'large' ? 'items-center' : 'items-baseline',
          'justify-between',
          size === 'large' ? '-large' : null,
          type === 'code' ? '-copy-code' : null,
          success ? '-success' : null,
          className,
        ].join(' ')}
        role="button"
        title={`Copy ${textAlt || text} to clipboard`}
        ref={button}
        data-clipboard-text={text}
      >
        {/* THE TEXT TO COPY */}
        <span
          className="text mr-2"
          style={{
            opacity: success ? 0 : 1,
          }}
        >
          {text}
        </span>
        {/* SUCCESS MESSAGE */}
        {success && (
          <span className="success-message">Copied!</span>
        )}
        <ClipboardIcon
          className="icon"
        />
      </a>
    </>
  )
}

CopyTextButton.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired,
  textAlt: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  onCopied: PropTypes.func,
  className: PropTypes.string,
}

CopyTextButton.defaultProps = {
  textAlt: '',
  label: '',
  size: 'rg',
  type: 'text',
  onCopied: () => {},
  className: '',
}


export default CopyTextButton
