import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { Transition } from 'react-transition-group'
import { gsap } from 'gsap'

import * as styles from '@/landing/TheHeader.module.css'

const TheHeaderHamburgerMenu = ({ linksOpen, toggleLinks, children }) => {
  // WHEN PATH CHANGES, CLOSE HAMBURGER
  const closeLinks = React.useCallback(() => {
    toggleLinks(false)
  }, [toggleLinks])
  React.useEffect(() => {
    Router.events.on('routeChangeStart', closeLinks)
    return () => {
      Router.events.off('routeChangeStart', closeLinks)
    }
  }, [closeLinks])

  // Toggle display prop
  const setDisplay = (node, state) => {
    const display = state ? 'block' : 'none'
    node.style.display = display
  }

  // Animate container (MENU)
  const animateContainer = React.useCallback((node, state) => {
    // Show container
    if (state) {
      setDisplay(node, state)
    }
    const scaleY = state ? 1 : 0
    const duration = state ? 0.2 : 0.2
    return gsap.to(node, { scaleY, duration })
  }, [])

  // Animate contents (LINKS)
  const animateContents = React.useCallback((node, state, delay = 0) => {
    const links = node.querySelectorAll('.TheHeaderPageLink')
    const opacity = state ? 1 : 0
    const duration = state ? 0.3 : 0
    return gsap.to(links, { opacity, duration, delay })
  }, [])

  // Run all animations
  const animationPromise = React.useRef()
  const toggleAnimation = async (node, state) => {
    // Show el before animating in
    if (state) {
      setDisplay(node, state)
    }
    animationPromise.current = new Promise((resolve) => {
      // Define order
      const firstAnimation = state ? animateContainer(node, state) : animateContents(node, state)
      const { vars: { duration: firstAnimationDuration } } = firstAnimation
      const delay = firstAnimationDuration * 1.2
      const secondAnimation = state ? animateContents(node, state, delay) : animateContainer(node, state)
      secondAnimation.then(() => {
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

  return (
    <Transition
      in={linksOpen}
      onEnter={(node) => toggleAnimation(node, true)}
      onExit={(node) => toggleAnimation(node, false)}
      onExited={(node) => setDisplay(node, false)}
      addEndListener={(node, done) => {
        onAnimationFinished(done)
      }}
      appear
    >
      <nav
        className={[
          styles.hamburgerMenu,
          linksOpen ? styles._open : null,
        ].join(' ')}
      >
        {children}
      </nav>
    </Transition>
  )
}

TheHeaderHamburgerMenu.propTypes = {
  linksOpen: PropTypes.bool.isRequired,
  toggleLinks: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default TheHeaderHamburgerMenu
