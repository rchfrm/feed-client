import React from 'react'

import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'

import CloseCircle from '@/icons/CloseCircle'
import FullHeight from '@/elements/FullHeight'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import styles from '@/PopupModal.module.css'

import alertStore from '@/store/alertStore'

const AlertModal = () => {
  const copy = alertStore(state => state.copy)
  const children = alertStore(state => state.children)
  const buttons = alertStore(state => state.buttons)
  const isOpen = alertStore(state => state.isOpen)
  const close = alertStore(state => state.close)

  const innerEl = React.useRef(null)

  // PANEL ANIMATION
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (isOpen) return setShow(true)
    setShow(false)
  }, [isOpen])
  const animationInstance = React.useRef()
  const animatePanel = (state, target) => {
    const opacity = state ? 1 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3
    return gsap.to(target, { opacity, duration, ease })
  }
  // Run all animations
  const toggleAnimation = (state, node) => {
    // Animate panel
    const panelAnimation = animatePanel(state, node)
    animationInstance.current = panelAnimation
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationInstance.current.then()
    done()
  }

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
          id="AlertModal"
          className={[
            'modal--container',
            'z-30',
            'opacity-0',
          ].join(' ')}
        >
          {/* Close button */}
          <button
            onClick={close}
            className={['button--close', styles.backButton].join(' ')}
            label="Close"
          >
            <CloseCircle />
          </button>
          {/* Inner */}
          <div
            id="AlertModal-innerEl"
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
            ].join(' ')}
            ref={innerEl}
          >
            <button
              className={['modal--background'].join(' ')}
              aria-label="close"
              onClick={close}
              style={{ zIndex: 1 }}
            />
            {/* CONTENT */}
            <div
              className={[
                'relative bg-white',
                'w-full mx-20 max-w-lg',
                'p-4 sm:p-5 rounded-dialogue',
                'pb-16 sm:pb-16',
                // 'border-solid border-black border-2',
              ].join(' ')}
              style={{ zIndex: 2 }}
            >
              {/* COPY */}
              {copy && (
                <MarkdownText markdown={copy} />
              )}
              {/* CHILDREN */}
              {children}
              {/* BUTTONS */}
              {buttons.map((buttonConfig, index) => {
                const { text, onClick } = buttonConfig
                // const firstButton = index === 0
                // const lastButton = index === buttons.length - 1
                return (
                  <Button
                    key={index}
                    className={[
                      'absolute bottom-0 left-0 w-full',
                      'rounded-t-none',
                    ].join(' ')}
                    onClick={onClick}
                  >
                    {text}
                  </Button>
                )
              })}
            </div>
          </div>
        </FullHeight>
      </Transition>
    </Portal>
  )
}

export default AlertModal
