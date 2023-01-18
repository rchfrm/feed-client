import React from 'react'

import shallow from 'zustand/shallow'
import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'

import FullHeight from '@/elements/FullHeight'
import MarkdownText from '@/elements/MarkdownText'
import ButtonNew from '@/elements/ButtonNew'
import ButtonFacebook from '@/elements/ButtonFacebook'

import useAlertStore from '@/stores/alertStore'

import styles from '@/AlertModal.module.css'

const getStoreState = (state) => ({
  copy: state.copy,
  children: state.children,
  buttons: state.buttons,
  isOpen: state.isOpen,
  close: state.close,
})

const AlertModal = () => {
  const {
    copy,
    children,
    buttons,
    isOpen,
    close,
  } = useAlertStore(getStoreState, shallow)

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
            <div
              className={[
                'relative',
                'rounded-dialogue bg-offwhite',
                'mx-8 sm:mx-20 max-w-lg',
                'overflow-auto',
                styles.content,
              ].join(' ')}
              style={{
                zIndex: 2,
              }}
            >
              <div
                className={['p-4 sm:p-5 pb-0'].join(' ')}
              >
                {copy && <MarkdownText markdown={copy} />}
                {children}
              </div>
              <div className="flex flex-wrap bg-black">
                {buttons.map((buttonConfig, index) => {
                  const { text, version, width, onClick, isFacebookButton, disabled, shouldCloseOnConfirm = true } = buttonConfig
                  const isFirstButton = index === 0
                  const isLastButton = index === buttons.length - 1
                  const Button = isFacebookButton ? ButtonFacebook : ButtonNew

                  return (
                    <Button
                      key={index}
                      version={version}
                      className={[
                        width === 'half' ? 'w-1/2' : 'w-full',
                        isLastButton ? 'rounded-t-none rounded-b-dialogue' : 'rounded-none',
                      ].join(' ')}
                      onClick={() => {
                        if (shouldCloseOnConfirm) {
                          close()
                        }
                        onClick()
                      }}
                      style={{
                        borderTop: '1px solid white',
                        ...(isFirstButton && ! width === 'half' && { borderTop: 'none' }),
                      }}
                      isDisabled={disabled}
                      trackComponentName="AlertModal"
                      fallbackCta={text}
                    >
                      {text}
                    </Button>
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
