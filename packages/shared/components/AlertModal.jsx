import React from 'react'

import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'

import FullHeight from '@/elements/FullHeight'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ButtonFacebook from '@/elements/ButtonFacebook'

import alertStore from '@/store/alertStore'

import styles from '@/AlertModal.module.css'

const getBgColor = (color) => {
  if (color === 'green') return 'bg-green'
  if (color === 'red') return 'bg-red'
  return null
}

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
    const duration = state ? 0.4 : 0.1
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
          {/* Inner */}
          <div
            id="AlertModal-innerEl"
            className={[
              'absolute',
              'top-0 left-0',
              'right-0 bottom-0',
              'flex',
              'items-center',
              'justify-center',
            ].join(' ')}
            ref={innerEl}
            style={{
              zIndex: 2,
            }}
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
                'relative',
                'rounded-dialogue bg-white',
                'mx-8 sm:mx-20 max-w-lg',
                'overflow-auto',
                styles.content,
              ].join(' ')}
              style={{
                zIndex: 2,
              }}
            >
              {/* CONTENT INNER */}
              <div
                className={['p-4 sm:p-5 pb-0'].join(' ')}
              >
                {/* COPY */}
                {copy && <MarkdownText markdown={copy} />}
                {/* CHILDREN */}
                {children}
              </div>
              {/* BUTTONS */}
              <div>
                {buttons.map((buttonConfig, index) => {
                  const { text, color, onClick, href, facebookButton, disabled } = buttonConfig
                  const firstButton = index === 0
                  const lastButton = index === buttons.length - 1
                  const ButtonType = facebookButton ? ButtonFacebook : Button
                  return (
                    <ButtonType
                      key={index}
                      className={[
                        'w-full',
                        lastButton ? 'rounded-t-none rounded-b-dialogue' : 'rounded-none',
                        facebookButton ? null : getBgColor(color),
                      ].join(' ')}
                      onClick={() => {
                        close()
                        onClick()
                      }}
                      style={{
                        borderTop: '1px solid white',
                        ...(firstButton && { borderTop: 'none' }),
                      }}
                      href={href}
                      disabled={disabled}
                    >
                      {text}
                    </ButtonType>
                  )
                })}
              </div>
            </div>
          </div>
        </FullHeight>
      </Transition>
    </Portal>
  )
}

export default AlertModal
