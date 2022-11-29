import React from 'react'

import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import useSwipeDismiss from '@/hooks/useSwipeDismiss'

import FullHeight from '@/elements/FullHeight'

import TheSubNavArtists from '@/app/TheSubNavArtists'
import TheSubNavLinks from '@/app/TheSubNavLinks'
import SignOutLink from '@/app/SignOutLink'


import styles from '@/app/TheSubNav.module.css'

const TheSubNav = ({ open, toggle, windowWidth }) => {
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
    node.style.display = state ? 'block' : 'none'
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
    const { width: navWidth } = target.getBoundingClientRect()
    const { scaleX } = getScales(state)
    const xPercent = animationType.current === 'desktop' && !state ? -100 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3
    // Desktop extra animations
    if (animationType.current === 'desktop') {
      // Animate page buttons
      const ThePageButtons = document.getElementById('ThePageButtons')
      const TheLogo = document.getElementById('TheLogo')
      const TheSubNavButton = document.getElementById('TheSubNavButton')
      const xMove = state ? navWidth : 0
      gsap.to([ThePageButtons, TheLogo, TheSubNavButton], { x: xMove, duration, ease })
      // Fade in sub nav background
      const TheSubNavBackground = document.getElementById('TheSubNavBackground')
      TheSubNavBackground.style.display = 'block'
      const bgOpacity = state ? 1 : 0
      gsap.to(TheSubNavBackground, { opacity: bgOpacity, duration, ease })
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
      const TheSubNavBackground = document.getElementById('TheSubNavBackground')
      // Reset the subnav
      gsap.set(TheSubNav, { x: 0, scaleX: 1, scaleY: 1, xPercent: -100 })
      // Hide the subnav background
      TheSubNavBackground.style.display = 'none'
      if (!ThePageButtons || !TheLogo || !TheSubNavButton) return
      // Reset the sidebar
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
        // Reset props after hidden animation
        if (!state) {
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
    // Set animation type based on screen width
    setAnimationType()
    // Reset initial position of els
    if (!open) resetEls()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onResize, [windowWidth])

  // DRAGGING
  const dragBind = useSwipeDismiss({
    movingTargetId: 'TheSubNav',
    touchTargetId: 'TheSubNav__contents',
    hide: () => toggle(false),
    reset: () => animateContainer(true),
    disableCondition: !isMobile.current || animationType.current === 'desktop',
  })

  // TOGGLE BODY SCROLL
  React.useEffect(() => {
    // Disable for desktops
    if (!isMobile.current) return
    const scrollEl = document.getElementById('TheSubNav')
    if (open) {
      disableBodyScroll(scrollEl)
    } else {
      enableBodyScroll(scrollEl)
    }
  }, [open])

  return (
    <Transition
      in={open}
      onEnter={(node) => toggleAnimation(true, node)}
      onExit={() => toggleAnimation(false)}
      onExited={(node) => setDisplay(false, node)}
      addEndListener={(node, done) => {
        onAnimationFinished(done)
      }}
      appear
    >
      <>
        <FullHeight
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
        </FullHeight>
        {/* The BG */}
        <div
          id="TheSubNavBackground"
          className={styles.background}
          role="button"
          aria-label="Close navigation"
          onClick={() => toggle(false)}
        />
      </>
    </Transition>
  )
}

export default TheSubNav
