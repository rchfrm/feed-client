import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ShareIcon from '@/icons/ShareIcon'
import ClipboardIcon from '@/icons/ClipboardIcon'

import useShareLink from '@/hooks/useShareLink'

import brandColors from '@/constants/brandColors'

const getButtonText = (isShareSupported, success, shareText, copyText) => {
  if (isShareSupported && success) return 'Shared!'
  if (!isShareSupported && success) return 'Copied!'
  if (isShareSupported) return shareText
  if (!isShareSupported) return copyText
}

const ButtonShare = ({
  url,
  title,
  text,
  shareText,
  copyText,
  useCopyFallback,
  onShare,
  className,
}) => {
  const button = React.useRef(null)
  const [success, setSuccess] = React.useState(false)
  const onSuccess = React.useCallback((shareType) => {
    setSuccess(true)
    setTimeout(() => {
      if (!button.current) return
      setSuccess(false)
    }, 800)
    // shareType = 'copy' | 'share'
    onShare(shareType)
  }, [onShare])
  // SETUP SHARE BUTTON
  const { isShareSupported, shareLink } = useShareLink({
    url,
    title,
    text,
    copyButtonFallback: button.current,
    onSuccess,
  })
  return (
    <Button
      version="black"
      className={[
        success ? 'bg-green' : null,
        className,
      ].join(' ')}
      ref={useCopyFallback ? button : null}
      onClick={shareLink}
      icon={(
        <>
          {isShareSupported ? (
            <ShareIcon
              fill={brandColors.white}
              style={{ width: '1rem', height: 'auto' }}
            />
          ) : (
            <ClipboardIcon
              fill={brandColors.white}
              style={{ width: '1rem', height: 'auto' }}
            />
          )}
        </>
          )}
    >
      {getButtonText(isShareSupported, success, shareText, copyText)}
    </Button>
  )
}

ButtonShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  shareText: PropTypes.string,
  copyText: PropTypes.string,
  useCopyFallback: PropTypes.bool,
  onShare: PropTypes.func,
  className: PropTypes.string,
}

ButtonShare.defaultProps = {
  text: '',
  shareText: 'Share link',
  copyText: 'Copy link',
  useCopyFallback: true,
  onShare: () => {},
  className: null,
}

export default ButtonShare
