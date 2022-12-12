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
  const [isShareSupported, setIsShareSupported] = React.useState(null)

  // Test if share is support
  React.useEffect(() => {
    setIsShareSupported(!! navigator.share)
  }, [])

  // Set up copy fallback
  React.useEffect(() => {
    if (isShareSupported || ! copyButtonFallback) return
    const clipboard = new ClipboardJS(copyButtonFallback, { text: () => url })
    clipboard.on('success', onSuccess.bind(null, 'copy'))
    return () => {
      clipboard.destroy()
    }
  }, [isShareSupported, copyButtonFallback, url, onSuccess])

  // Share function
  const shareLink = React.useCallback(() => {
    if (! isShareSupported) return
    navigator.share({
      title,
      text: text || title,
      url,
    })
      .then(onSuccess.bind(null, 'share'))
      .catch((error) => onError(error))
  }, [url, title, text, isShareSupported, onError, onSuccess])

  return { isShareSupported, shareLink }
}

export default useShareLink
