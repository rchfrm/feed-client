import React from 'react'
import shallow from 'zustand/shallow'
import { gsap, Power2 } from 'gsap'
import { Portal } from 'react-portal'
import { Transition } from 'react-transition-group'
import FullHeight from '@/elements/FullHeight'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import useAlertStore from '@/stores/alertStore'
import ButtonCloseCircle from '@/elements/ButtonCloseCircle'
import brandColors from '@/constants/brandColors'

const getStoreState = (state) => ({
  copy: state.copy,
  children: state.children,
  buttons: state.buttons,
  isOpen: state.isOpen,
  close: state.close,
  isIntegrationError: state.isIntegrationError,
})

const AlertModal = () => {
  const {
    copy,
    children,
    buttons,
    isOpen,
    close,
    isIntegrationError,
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
                'w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] minContent:w-full',
                'rounded-dialogue bg-offwhite',
                'mx-8 sm:mx-20 max-w-lg',
                isIntegrationError ? 'border border-solid border-red bg-red-bg-light' : null,
              ].join(' ')}
              style={{
                zIndex: 2,
              }}
            >
              <ButtonCloseCircle
                onClick={close}
                className="absolute -right-3.5 -top-3.5 bg-white rounded-full"
                svgClassname="w-7 h-auto"
                fill={isIntegrationError ? brandColors.red : brandColors.black}
              />
              <div className="p-5">
                {copy && <MarkdownText markdown={copy} />}
                {children}
                <div className="flex justify-end mt-8">
                  {buttons.map((buttonConfig, index) => {
                    const { text, version, color, onClick, isDisabled, shouldCloseOnConfirm = true } = buttonConfig

                    return (
                      <Button
                        key={index}
                        version={version}
                        color={isIntegrationError ? 'red' : color}
                        onClick={() => {
                          if (shouldCloseOnConfirm) {
                            close()
                          }
                          onClick()
                        }}
                        className="last:ml-3 xxs:last:ml-4"
                        isDisabled={isDisabled}
                        trackComponentName="AlertModal"
                      >
                        {text}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </FullHeight>
      </Transition>
    </Portal>
  )
}

export default AlertModal
