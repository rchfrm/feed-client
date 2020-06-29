import React from 'react'

import { Portal } from 'react-portal'

import CloseCircle from '@/icons/CloseCircle'

import useBrowserStore from '@/hooks/useBrowserStore'

import popupStore from '@/store/popupStore'

import styles from '@/PopupModal.module.css'
import FullHeight from './elements/FullHeight'

const PopupModal = ({ contentType }) => {
  const content = popupStore(state => state.content)
  const closePopup = popupStore(state => state.clear)

  // Resize iframe container
  const { width: windowWidth, height: windowHeight } = useBrowserStore()
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
      <FullHeight
        className={[
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'z-30',
        ].join(' ')}
      >
        {/* Close button */}
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
        >
          <button
            className={['modal--background', styles.background].join(' ')}
            aria-label="close"
            onClick={closePopup}
          />
          {content}
        </div>
      </FullHeight>
    </Portal>
  )
}


export default PopupModal
