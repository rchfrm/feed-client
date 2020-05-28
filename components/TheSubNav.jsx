import React from 'react'

import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'

import Div100vh from 'react-div-100vh'

import useOnResize from './hooks/useOnResize'

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
    // Set mobile type
    isMobile.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  }, [])
  // Detect animation type
  const animationType = React.useRef('')
  const setAnimationType = () => {
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    if (isDesktopLayout) {
      animationType.current = 'desktop'
      return
    }
    animationType.current = 'mobile'
  }
  // INITIAL ANIMATION
  const setDisplay = (state, node) => {
    const display = state ? 'block' : 'none'
    node.style.display = display
  }
  // ANIMATE
  const animationPromise = React.useRef()
  const getScales = (state) => {
    if (animationType.current === 'desktop' || state) return { scaleX: 1, scaleY: 1 }
    return { scaleX: 0, scaleY: 1 }
  }
  // Panel animation
  const animateContainer = React.useCallback((state) => {
    const target = document.getElementById('TheSubNav')
    const { height, width: navWidth } = target.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const { scaleX } = getScales(state)
    const xPercent = animationType.current === 'desktop' && !state ? -100 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3
    // Animate page buttons
    console.log('animationType.current', animationType.current)
    if (animationType.current === 'desktop') {
      console.log('mobe buttons')
      const ThePageButtons = document.getElementById('ThePageButtons')
      const TheLogo = document.getElementById('TheLogo')
      const TheSubNavButton = document.getElementById('TheSubNavButton')
      console.log('state', state)
      console.log('navWidth', navWidth)
      const xMove = state ? navWidth : 0
      gsap.to([ThePageButtons, TheLogo, TheSubNavButton], { x: xMove, duration, ease })
    }
    // Animate container
    return gsap.to(target, { scaleX, x: 0, y: 0, xPercent, duration, ease })
  }, [])
  // Background animation
  const animateContents = (state, delay = 0) => {
    const { current: target } = contentsEl
    const opacity = state ? 1 : 0
    const duration = state ? 0.4 : 0
    return gsap.to(target, { opacity, y: 0, duration, delay, ease: Power1.easeOut })
  }
  // Reset els after animation
  const resetEls = () => {
    const TheSubNav = document.getElementById('TheSubNav')
    if (!TheSubNav) return
    if (animationType.current === 'desktop') {
      const ThePageButtons = document.getElementById('ThePageButtons')
      const TheLogo = document.getElementById('TheLogo')
      const TheSubNavButton = document.getElementById('TheSubNavButton')
      gsap.set(TheSubNav, { x: 0, scaleX: 1, scaleY: 1, xPercent: -100 })
      if (!ThePageButtons || !TheLogo || !TheSubNavButton) return
      gsap.set([ThePageButtons, TheLogo, TheSubNavButton], { x: 0 })
      return
    }
    gsap.set(TheSubNav, { x: 0, scaleX: 0, scaleY: 1, xPercent: 0 })
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
      secondAnimation.then(() => {
        if (!state) {
          // Reset props
          resetEls()
        }
        resolve()
      })
    })
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationPromise.current
    // Tell component everything is done
    done()
  }

  // HANDLE WINDOW RESIZE
  const onResize = () => {
    // Set animation tpye based on screen width
    setAnimationType()
    // Reset inital position of els
    if (!show) resetEls()
  }
  useOnResize({ callback: onResize })

  // DRAGGING
  const dragBind = useSwipeDismiss({
    movingTargetId: 'TheSubNav',
    touchTargetId: 'TheSubNav__contents',
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
        className={['page--content', styles.container].join(' ')}
      >
        <div
          id="TheSubNav__contents"
          className={styles.contents}
          ref={contentsEl}
          {...dragBind()}
        >
          <div className={[styles.inner].join(' ')}>
            <TheSubNavLinks />
            <TheSubNavArtists />
          </div>
          <p className={styles.signOutLink_mobile}>
            <SignOutLink />
          </p>
        </div>
      </Div100vh>
    </Transition>
  )
}

export default TheSubNav
