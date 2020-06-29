import React from 'react'

import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'

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

  // Panel animation
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
    const panelAnimation = animatePanel(state, node)
    animationInstance.current = panelAnimation
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationInstance.current.then()
    console.log('done')
    done()
  }

  // if (!content) return null
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
            'modal--container',
            'z-30',
            'opacity-0',
          ].join(' ')}
        >
          {/* Close button */}
          <button
            onClick={closePopup}
          />
          {content}
        </div>
      </FullHeight>
    </Portal>
  )
}


export default PopupModal
