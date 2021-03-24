import React from 'react'

import shallow from 'zustand/shallow'
import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'

import CloseCircle from '@/icons/CloseCircle'

import useBrowserStore from '@/hooks/useBrowserStore'

import usePopupStore from '@/stores/popupStore'

import styles from '@/PopupModal.module.css'
import FullHeight from '@/elements/FullHeight'

// Resizes iframes
const resizeIframe = ({ iframeContainerEl, innerEl, windowWidth, windowHeight }) => {
  const ratio = 16 / 9
  const screenRatio = windowWidth / windowHeight
  const [paddingY, paddingX] = window.getComputedStyle(innerEl).padding.split(' ')
  const maxWidth = windowWidth - (2 * parseFloat(paddingX))
  const maxHeight = windowHeight - (2 * parseFloat(paddingY))
  const width = screenRatio >= 1 ? maxHeight * ratio : maxWidth
  const height = screenRatio < 1 ? maxWidth * ratio : maxHeight
  iframeContainerEl.style.width = `${width}px`
  iframeContainerEl.style.height = `${height}px`
}

// Resizes everything
const onResize = ({ innerEl, captionEl, iframeContainerEl, windowWidth, windowHeight }) => {
  // Set container padding to fit caption
  if (captionEl) {
    const captionHeight = captionEl.clientHeight
    innerEl.style.paddingBottom = `${captionHeight}px`
  // Else reset padding
  } else {
    innerEl.style.paddingBottom = ''
  }
  // Resize iframe
  if (iframeContainerEl) {
    resizeIframe({ iframeContainerEl, innerEl, windowWidth, windowHeight })
  }
}

const getElements = (containerEl) => {
  return {
    innerEl: containerEl.querySelector('#PopupModal-innerEl'),
    captionEl: containerEl.querySelector('#PopupModal-captionEl'),
    iframeContainerEl: containerEl.querySelector('#PopupModal-iframeContainerEl'),
  }
}

// Read from store
const getPopupStoreState = (state) => ({
  content: state.content,
  caption: state.caption,
  contentType: state.contentType,
  closePopup: state.clear,
})

const PopupModal = () => {
  const {
    content,
    caption,
    contentType,
    closePopup,
  } = usePopupStore(getPopupStoreState, shallow)

  // On resize
  const { width: windowWidth, height: windowHeight } = useBrowserStore()
  const iframeContainerEl = React.useRef(null)
  const innerEl = React.useRef(null)
  const captionEl = React.useRef(null)
  React.useEffect(() => {
    // Stop here if no popup
    if (!content || !innerEl.current) return
    onResize({
      innerEl: innerEl.current,
      captionEl: captionEl.current,
      iframeContainerEl: iframeContainerEl.current,
      windowWidth,
      windowHeight,
    })
  }, [windowWidth, windowHeight, content, caption, contentType])

  // PANEL ANIMATION
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (content) return setShow(true)
    setShow(false)
  }, [content])
  const animationInstance = React.useRef()
  const animatePanel = (state, target) => {
    const opacity = state ? 1 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3
    return gsap.to(target, { opacity, duration, ease })
  }
  // Run all animations
  const toggleAnimation = (state, node) => {
    // Resize things before animating
    const els = getElements(node)
    onResize({
      innerEl: els.innerEl,
      captionEl: els.captionEl,
      iframeContainerEl: els.iframeContainerEl,
      windowWidth,
      windowHeight,
    })
    // Animate panel
    const panelAnimation = animatePanel(state, node)
    animationInstance.current = panelAnimation
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationInstance.current.then()
    done()
  }

  // if (!content) return null
  return (
    <Portal>
      <Transition
        in={show}
        onEnter={(node) => toggleAnimation(true, node)}
        onExit={(node) => toggleAnimation(false, node)}
        addEndListener={(node, done) => {
          onAnimationFinished(done)
        }}
        unmountOnExit
      >
        <FullHeight
          id="PopupModal"
          className={[
            'modal--container',
            'z-30',
            'opacity-0',
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
          {/* Inner */}
          <div
            id="PopupModal-innerEl"
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
              caption ? styles._hasCaption : '',
            ].join(' ')}
            ref={innerEl}
          >
            <button
              className={['modal--background', styles.background].join(' ')}
              aria-label="close"
              onClick={closePopup}
            />
            {contentType === 'iframe' ? (
            // Iframe
              <div
                id="PopupModal-iframeContainerEl"
                className={styles.iframeContainerEl}
                ref={iframeContainerEl}
                style={{
                  position: 'relative',
                }}
              >
                {content}
              </div>
            // Image
            ) : content}
            {/* Caption */}
            {caption && (
              <figcaption
                id="PopupModal-captionEl"
                className={styles.caption}
                ref={captionEl}
              >
                <span>
                  {caption}
                </span>
              </figcaption>
            )}
          </div>
        </FullHeight>
      </Transition>
    </Portal>
  )
}


export default PopupModal
