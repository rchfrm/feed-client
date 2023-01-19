import React from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'
import ClipboardIcon from '@/icons/ClipboardIcon'

const CopyTextButton = ({
  label,
  text,
  type,
  textAlt,
  size,
  onCopied,
  className,
}) => {
  const button = React.useRef(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const onSuccess = React.useCallback(() => {
    setIsSuccess(true)
    onCopied(text)

    setTimeout(() => {
      if (! button.current) return
      setIsSuccess(false)
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
      {label && <span className="block font-bold text-sm mb-2">{label}</span>}
      <a
        className={[
          'w-full inline-flex relative',
          'justify-between items-center',
          'border border-solid',
          'no-underline rounded-button',
          isSuccess ? 'border-green' : 'border-black',
          size === 'large' ? 'px-3 py-2' : 'px-2 py-1',
          className,
        ].join(' ')}
        role="button"
        title={`Copy ${textAlt || text} to clipboard`}
        ref={button}
        data-clipboard-text={text}
      >
        <span
          className={[
            'text mr-2',
            isSuccess ? 'opacity-0' : null,
            type === 'code' ? 'w-full pr-8 font-mono text-xs break-words' : null,
          ].join(' ')}
        >
          {text}
        </span>
        {isSuccess && <span className="absolute -translate-x-1/2 left-1/2">Copied!</span>}
        <ClipboardIcon
          className={[
            'absolute right-2',
            size === 'large' ? 'w-5' : 'w-4', 'h-auto',
          ].join(' ')}
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
  size: 'regular',
  type: 'text',
  onCopied: () => {},
  className: '',
}


export default CopyTextButton
