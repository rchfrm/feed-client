import React from 'react'

import { Portal } from 'react-portal'

import CloseCircle from '@/icons/CloseCircle'

import popupStore from '@/store/popupStore'

import styles from '@/PopupModal.module.css'
import useOnResize from '@/hooks/useOnResize'

const PopupModal = ({ content }) => {
  const contentType = popupStore(state => state.contentType)
  const closePopup = popupStore(state => state.clear)

  // Resize iframe container
  const { width: windowWidth, height: windowHeight } = useOnResize()
  const iframeContainer = React.useRef(null)
  const innerEl = React.useRef(null)
  React.useEffect(() => {
    if (!content || !contentType === 'iframe' || !iframeContainer.current) return
    const ratio = 16 / 9
    const screenRatio = windowWidth / windowHeight
    const [paddingY, paddingX] = window.getComputedStyle(innerEl.current).padding.split(' ')
    const maxWidth = windowWidth - (2 * parseFloat(paddingX))
    const maxHeight = windowHeight - (2 * parseFloat(paddingY))
    const width = screenRatio >= 1 ? maxHeight * ratio : maxWidth
    const height = screenRatio < 1 ? maxWidth * ratio : maxHeight
    iframeContainer.current.style.width = `${width}px`
    iframeContainer.current.style.height = `${height}px`
  }, [windowWidth, windowHeight, content, contentType])

  if (!content) return null
  return (
    <Portal>
      <div
        className={[
          'modal--container',
          'z-30',
        ].join(' ')}
      >
        {/* Close button */}
        <button
          onClick={closePopup}
          className={['button--close', styles.backButton].join(' ')}
          label="Close"
        >
          <CloseCircle />
        </button>
        <div
          className={[
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'z-2',
            'flex',
            'items-center',
            'justify-center',
            styles.inner,
          ].join(' ')}
          ref={innerEl}
        >
          <button
            className={['modal--background', styles.background].join(' ')}
            aria-label="close"
            onClick={closePopup}
          />
          {contentType === 'iframe' ? (
            <div
              className={styles.iframeContainer}
              ref={iframeContainer}
              style={{
                position: 'relative',
              }}
            >
              {content}
            </div>
          ) : content}
        </div>
      </div>
    </Portal>
  )
}


export default PopupModal
