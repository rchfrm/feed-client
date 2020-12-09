import React from 'react'

import ClipboardJS from 'clipboard'

const useShareLink = ({
  url = '',
  title = '',
  text = '',
  copyButtonFallback = null,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [isShareSupported, setIsShareSupported] = React.useState(false)

  // Test if share is support
  React.useEffect(() => {
    setIsShareSupported(!!navigator.share)
  }, [])

  // Set up copy fallback
  React.useEffect(() => {
    if (isShareSupported || !copyButtonFallback) return
    console.log('setup clipboard')
    const clipboard = new ClipboardJS(copyButtonFallback, { text: () => url })
    clipboard.on('success', onSuccess)
    return () => {
      clipboard.destroy()
    }
  }, [isShareSupported, copyButtonFallback, url, onSuccess])

  // Share function
  const shareLink = React.useCallback(() => {
    if (!isShareSupported) return
    navigator.share({
      title,
      text: text || title,
      url,
    })
      .then(onSuccess)
      .catch((error) => onError(error))
  }, [url, title, text, isShareSupported, onError, onSuccess])

  return { isShareSupported, shareLink }
}

export default useShareLink
