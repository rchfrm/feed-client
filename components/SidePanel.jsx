import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'


import Spinner from './elements/Spinner'
import CloseCircle from './icons/CloseCircle'

import styles from './SidePanel.module.css'


const setBodyScroll = (canScroll, scrollTop) => {
  const container = document.querySelector('#container')
  if (!canScroll) {
    scrollTop.current = window.pageYOffset
    document.body.classList.add('__body-no-scroll')
    container.style.marginTop = `${-1 * scrollTop.current}px`
    return
  }

  document.body.classList.remove('__body-no-scroll')
  window.pageYOffset = scrollTop.current
  container.style.marginTop = ''
}

// * INSERTED via the SidePanelContext.jsx
// * with the props passed in
function SidePanel({
  isOpen,
  content,
  button,
  toggle,
  isLoading,
}) {
  // TOGGLE SHOWING
  // and
  // TOGGLE BODY SCROLLING
  const scrollTop = React.useRef(0)
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (!isOpen) {
      setShow(false)
      setBodyScroll(true, scrollTop)
      return
    }
    setShow(!!(isOpen && content))
    setBodyScroll(false, scrollTop)
  }, [isOpen, content])

  // Define close function
  const close = () => toggle(false)

  // ANIMATE
  const animationInstances = React.useRef({
    bg: null,
    panel: null,
  })
  // Background animation
  const bgEl = React.useRef()
  const animateBg = (state) => {
    const opacity = state ? 1 : 0
    const duration = state ? 0.3 : 0.5
    const { current: target } = bgEl
    console.log('bgEl', bgEl)
    return gsap.to(target, { opacity, duration, ease: Power1.easeOut })
  }
  // Panel animation
  const panelEl = React.useRef()
  const animatePanel = (state) => {
    const { current: target } = panelEl
    const xPercent = state ? 0 : 105
    const ease = state ? Power2.easeOut : Power2.easeOut
    const duration = state ? 0.6 : 0.3
    return gsap.to(target, { xPercent, x: 0, duration, ease })
  }
  // Run all animations
  const toggleAnimation = (state) => {
    console.log('animate')
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
    console.log('animation done')
    done()
  }

  return (
    <Transition
      in={show}
      onEnter={() => toggleAnimation(true)}
      onExit={() => toggleAnimation(false)}
      addEndListener={(node, done) => {
        onAnimationFinished(done)
      }}
      appear
      unmountOnExit
    >
      <div className={styles.SidePanel}>
        {/* The BG */}
        <div
          className={styles.background}
          onClick={close}
          role="button"
          aria-label="Close panel"
          ref={bgEl}
        />
        {/* PANEL */}
        <div
          className={styles.container}
          ref={panelEl}
        >
          {/* Show loader if loading */}
          {isLoading && (
            <div className={styles.loader}>
              <Spinner className={styles.spinner} />
            </div>
          )}
          {/* The content */}
          <div className={styles.container__inner}>
            { content }
          </div>
          {/* Close button */}
          <button
            onClick={close}
            className={['button--close', styles.backButton].join(' ')}
            label="Back"
          >
            <CloseCircle />
          </button>
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
  button: PropTypes.node,
  toggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

SidePanel.defaultProps = {
  isOpen: false,
  content: <></>,
  button: null,
  isLoading: false,
}

export default SidePanel
