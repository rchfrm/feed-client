import React from 'react'

import { gsap, Power1, Power2, Back } from 'gsap'
import { Transition } from 'react-transition-group'

import Div100vh from 'react-div-100vh'

import TheSubNavArtists from './TheSubNavArtists'
import TheSubNavLinks from './TheSubNavLinks'
import SignOutLink from './SignOutLink'

import useSwipeDismiss from './hooks/useSwipeDismiss'

import styles from './TheSubNav.module.css'

const TheSubNav = ({ show, setShow }) => {
  // Get els
  const contentsEl = React.useRef()
  // Detect if mobile
  const isMobile = React.useRef(false)
  React.useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  }, [])
  // INITIAL ANIMATION
  const setDisplay = (state, node) => {
    const display = state ? 'block' : 'none'
    node.style.display = display
  }
  // ANIMATE
  const animationPromise = React.useRef()
  const getScales = (state, isMobile) => {
    if (state) return { scaleX: 1, scaleY: 1 }
    if (isMobile && !state) return { scaleX: 0, scaleY: 1 }
    if (!isMobile && !state) return { scaleX: 1, scaleY: 0 }
  }
  // Panel animation
  const animateContainer = React.useCallback((state) => {
    const target = document.getElementById('TheSubNav')
    const { height } = target.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const { scaleX, scaleY } = getScales(state, isMobile.current)
    const ease = height < windowHeight ? Back.easeOut.config(1.2) : Power2.easeOut
    const duration = state ? 0.4 : 0.3
    return gsap.to(target, { scaleX, scaleY, x: 0, y: 0, duration, ease })
  }, [])
  // Background animation
  const animateContents = (state, delay = 0) => {
    const { current: target } = contentsEl
    const opacity = state ? 1 : 0
    const duration = state ? 0.4 : 0
    return gsap.to(target, { opacity, y: 0, duration, delay, ease: Power1.easeOut })
  }
  // Run all animations
  const toggleAnimation = async (state, node) => {
    // Show el before animating in
    if (state) {
      setDisplay(state, node)
    }
    animationPromise.current = new Promise((resolve) => {
      // Define order
      const firstAnimation = state ? animateContainer(state) : animateContents(state)
      const { vars: { duration: firstAnimationDuration } } = firstAnimation
      const delay = firstAnimationDuration * 0.8
      const secondAnimation = state ? animateContents(state, delay) : animateContainer(state)
      secondAnimation.then(resolve)
    })
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationPromise.current
    done()
  }

  // DRAGGING
  const dragBind = useSwipeDismiss({
    movingTargetId: 'TheSubNav',
    touchTargetId: 'TheSubNav__contents',
    visible: show,
    hide: () => setShow(false),
    reset: () => animateContainer(true),
    disableCondition: !isMobile.current,
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
      <Div100vh
        id="TheSubNav"
        className={['page--content', '_fixed', styles.container].join(' ')}
      >
        <div
          id="TheSubNav__contents"
          className={styles.contents}
          ref={contentsEl}
          {...dragBind()}
        >
          <div className={[styles.inner, 'md:grid', 'md:grid-cols-12', 'md:items-center'].join(' ')}>
            <TheSubNavLinks className="col-span-6" />
            <TheSubNavArtists className="col-span-5" />
          </div>
          <p className={styles.signOutLink}>
            <SignOutLink />
          </p>
        </div>
      </Div100vh>
    </Transition>
  )
}

export default TheSubNav
