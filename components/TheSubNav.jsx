import React from 'react'

import { gsap, Power1, Power2, Back } from 'gsap'
import { Transition } from 'react-transition-group'
import { useDrag } from 'react-use-gesture'

import Div100vh from 'react-div-100vh'

import TheSubNavArtists from './TheSubNavArtists'
import TheSubNavLinks from './TheSubNavLinks'
import SignOutLink from './SignOutLink'

import styles from './TheSubNav.module.css'

const TheSubNav = ({ show, setShow }) => {
  // Get els
  const contentsEl = React.useRef()
  // Set if can hover
  const isMobile = React.useRef(false)
  React.useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  }, [])
  // ANIMATE
  const animationPromise = React.useRef()
  // Panel animation
  const getScales = (state, isMobile) => {
    if (state) return { scaleX: 1, scaleY: 1 }
    if (isMobile && !state) return { scaleX: 0, scaleY: 1 }
    if (!isMobile && !state) return { scaleX: 1, scaleY: 0 }
  }
  const animateContainer = (state) => {
    const target = document.getElementById('TheSubNav')
    const { height } = target.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const { scaleX, scaleY } = getScales(state, isMobile.current)
    const ease = height < windowHeight ? Back.easeOut.config(1.2) : Power2.easeOut
    const duration = state ? 0.4 : 0.3
    return gsap.to(target, { scaleX, scaleY, x: 0, y: 0, duration, ease })
  }
  // Background animation
  const animateContents = (state) => {
    const { current: target } = contentsEl
    const opacity = state ? 1 : 0
    const duration = state ? 0.2 : 0
    return gsap.to(target, { opacity, duration, ease: Power1.easeOut })
  }
  // Run all animations
  const toggleAnimation = async (state) => {
    animationPromise.current = new Promise((resolve) => {
      // Define order
      const firstAnimation = state ? animateContainer(state) : animateContents(state)
      const secondAnimation = state ? animateContents(state) : animateContainer(state)
      secondAnimation.pause()
      // RUN
      firstAnimation
        .then(() => {
          secondAnimation
            .play()
            .then(resolve)
        })
    })
  }
  // Animation complete promise
  const onAnimationFinished = async (done) => {
    await animationPromise.current
    done()
  }

  // DRAGGING
  const panelSetter = React.useRef()
  const dragAnimation = React.useRef()
  React.useEffect(() => {
    if (!show) return
    const target = document.getElementById('TheSubNav')
    panelSetter.current = gsap.quickSetter(target, 'x', 'px')
  }, [show])
  const animateDragEnd = (hide) => {
    if (hide) return setShow(false)
    dragAnimation.current = animateContainer(true)
  }
  const onDrag = (dragState) => {
    // Don't listen to drag if desktop
    if (!isMobile.current) return
    const { current: setter } = panelSetter
    const { movement, last, velocity } = dragState
    const [x] = movement
    if (last) {
      const { height: panelHeight } = contentsEl.current.getBoundingClientRect()
      const velocityThreshold = 1.2
      const movementThreshold = 0.7
      const hidePanel = velocity > velocityThreshold || x / panelHeight > movementThreshold
      animateDragEnd(hidePanel)
      return
    }
    if (x < 0) return
    // Move panel
    setter(x)
  }
  const dragConfig = {
    axis: 'x',
    domTarget: contentsEl.current,
  }
  const dragBind = useDrag(state => onDrag(state), dragConfig)

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
      <Div100vh id="TheSubNav" className={['page--content', '_fixed', styles.container].join(' ')}>
        <div
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
