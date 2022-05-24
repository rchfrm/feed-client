import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'

import useSwipeDismiss from '@/hooks/useSwipeDismiss'

import Spinner from '@/elements/Spinner'
import ButtonCloseCircle from '@/elements/ButtonCloseCircle'

import styles from '@/SidePanel.module.css'

// * INSERTED via the SidePanelContext.jsx
// * with the props passed in
function SidePanel({
  isOpen,
  content,
  setContent,
  button,
  toggle,
  isLoading,
  disableDrag,
  onSidepanelClose,
}) {
  // TOGGLE SHOWING
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (!isOpen) {
      setShow(false)
      return
    }
    setShow(!!(isOpen && content))
  }, [isOpen, content])

  // Define close function
  const close = React.useCallback(() => {
    toggle(false)
    if (onSidepanelClose) onSidepanelClose()
  }, [toggle, onSidepanelClose])

  // INITIAL ANIMATION
  const setDisplay = (state, node) => {
    const display = state ? 'block' : 'none'
    node.style.display = display
  }
  // ANIMATE
  const animationInstances = React.useRef({
    bg: null,
    panel: null,
  })
  // Background animation
  const bgEl = React.useRef()
  const animateBg = (state) => {
    const { current: target } = bgEl
    const opacity = state ? 1 : 0
    const duration = state ? 0.3 : 0.5
    return gsap.to(target, { opacity, duration, ease: Power1.easeOut })
  }
  // Panel animation
  const panelEl = React.useRef()
  const animatePanel = (state) => {
    const { current: target } = panelEl
    const { width } = target.getBoundingClientRect()
    const xPercent = 0
    const x = state ? 0 : width * 1.05
    const ease = state ? Power2.easeOut : Power2.easeOut
    const duration = state ? 0.6 : 0.3
    return gsap.to(target, { xPercent, x, duration, ease })
  }
  // Run all animations
  const toggleAnimation = (state, node) => {
    // Show el before animating in
    if (state) {
      setDisplay(state, node)
    }
    const bgAnimation = animateBg(state)
    const panelAnimation = animatePanel(state)
    animationInstances.current = {
      bg: bgAnimation,
      panel: panelAnimation,
    }
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    const animations = Object.values(animationInstances.current)
    const animatePromises = animations.map((anim) => {
      return anim.then()
    })
    await Promise.all(animatePromises)
    done()
    // After closing, empty contents
    if (!show) setContent(null)
  }

  // SCROLLTOP when opening
  React.useEffect(() => {
    if (show) {
      const inner = document.getElementById('SidePanel__container-inner')
      inner.scrollTop = 0
    }
  }, [show])

  // DRAGGING
  const dragBind = useSwipeDismiss({
    movingTargetId: 'SidePanel__container',
    touchTargetId: 'SidePanel',
    hide: () => close(),
    reset: () => animatePanel(true),
    disableCondition: disableDrag,
  })

  return (
    <Transition
      in={show}
      onEnter={(node) => toggleAnimation(true, node)}
      onExit={() => toggleAnimation(false)}
      onExited={(node) => setDisplay(false, node)}
      addEndListener={(node, done) => {
        onAnimationFinished(done)
      }}
      appear
    >
      <div
        id="SidePanel"
        className={[
          'modal--container',
          styles.SidePanel,
          isLoading ? styles._loading : null,
        ].join(' ')}
        {...dragBind()}
      >
        {/* The BG */}
        <div
          className={[
            'modal--background',
            styles.background,
          ].join(' ')}
          onClick={close}
          role="button"
          aria-label="Close panel"
          ref={bgEl}
        />
        {/* PANEL */}
        <div
          id="SidePanel__container"
          className={styles.container}
          ref={panelEl}
        >
          {/* Show loader if loading */}
          {isLoading && (
            <div className={['modal--background', styles.loader].join(' ')}>
              <Spinner className={styles.spinner} />
            </div>
          )}
          {/* The content */}
          <div
            id="SidePanel__container-inner"
            className={styles.container__inner}
          >
            { content }
          </div>
          {/* Close button */}
          <ButtonCloseCircle
            className={styles.backButton}
            onClick={close}
          />
          {/* Optional side panel CTA */}
          {button && (
            <div className={styles.ctaButton}>
              {button}
            </div>
          )}
        </div>
      </div>
    </Transition>
  )
}

SidePanel.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.node,
  setContent: PropTypes.func.isRequired,
  button: PropTypes.node,
  toggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disableDrag: PropTypes.bool.isRequired,
  onSidepanelClose: PropTypes.func,
}

SidePanel.defaultProps = {
  isOpen: false,
  content: null,
  button: null,
  isLoading: false,
  onSidepanelClose: () => {},
}

export default SidePanel
