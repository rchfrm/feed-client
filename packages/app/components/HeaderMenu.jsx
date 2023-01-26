import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useSwipeDismiss from '@/hooks/useSwipeDismiss'
import useOnResize from '@/landing/hooks/useOnResize'
import FullHeight from '@/elements/FullHeight'
import FeedLogo from '@/icons/FeedLogo'
import CrossIcon from '@/icons/CrossIcon'
import HeaderMenuLinks from '@/app/HeaderMenuLinks'
import brandColors from '@/constants/brandColors'

const HeaderMenu = ({ isOpen, toggle }) => {
  const containerElement = React.useRef(null)
  const contentElement = React.useRef(null)
  const backGroundElement = React.useRef(null)
  const closeButtonElement = React.useRef(null)
  const animationPromise = React.useRef(null)
  const { width } = useOnResize()

  // Initial animation
  const setDisplay = (state, node) => {
    node.style.display = state ? 'block' : 'none'
  }

  // Container animation
  const animateContainer = React.useCallback((state) => {
    const xPercent = ! state ? -100 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3

    // Fade in background
    const opacity = state ? 0.8 : 0
    backGroundElement.current.style.display = 'block'
    gsap.to(backGroundElement.current, { opacity, duration, ease })

    // Slide container
    return gsap.to(containerElement.current, { xPercent, duration, ease })
  }, [])

  // Content animation
  const animateContent = (state, delay = 0) => {
    const opacity = state ? 1 : 0
    const duration = state ? 0.4 : 0

    // Fade in content
    return gsap.to([contentElement.current, closeButtonElement.current], { opacity, duration, delay, ease: Power1.easeOut })
  }

  // Reset background element after animation
  const resetElements = () => {
    if (! containerElement.current) {
      return
    }

    gsap.set(containerElement.current, { xPercent: -100 })
    backGroundElement.current.style.display = 'none'
  }

  // Run all animations
  const toggleAnimation = async (state, node) => {
    // Show element before animating in
    if (state) {
      setDisplay(state, node)
    }

    animationPromise.current = new Promise((resolve) => {
      const firstAnimation = state ? animateContainer(state) : animateContent(state)
      const { vars: { duration: firstAnimationDuration } } = firstAnimation
      const delay = firstAnimationDuration * 0.8
      const secondAnimation = state ? animateContent(state, delay) : animateContainer(state)

      secondAnimation.then(() => {
        // Reset props after hidden animation
        if (! state) {
          resetElements()
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

  React.useEffect(() => {
    const isMobile = width < 992

    if (isMobile || ! isOpen) {
      return
    }

    toggle()
  }, [width, isOpen, toggle])

  React.useEffect(() => {
    resetElements()
  }, [])

  // Dragging
  const dragBind = useSwipeDismiss({
    movingTargetId: 'navContainer',
    touchTargetId: 'navContent',
    hide: () => toggle(false),
    reset: () => animateContainer(true),
  })

  // Toggle body scroll
  React.useEffect(() => {
    if (isOpen) {
      disableBodyScroll(containerElement.current)
    } else {
      enableBodyScroll(containerElement.current)
    }
  }, [isOpen])

  return (
    <Transition
      in={isOpen}
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
          id="navContainer"
          className={[
            'page--content',
            'hidden fixed left-0 top-0 z-[14]',
            'w-5/6 md:w-auto pb-10 pt-10 md:p-10',
            'bg-black text-grey origin-left',
          ].join(' ')}
          ref={containerElement}
        >
          <button
            onClick={toggle}
            className="absolute top-20 -right-[22px] flex justify-center items-center w-12 h-12 bg-anthracite rounded-full"
            ref={closeButtonElement}
          >
            <CrossIcon className="w-8 h-8" fill={brandColors.offwhite} />
          </button>
          <div
            id="navContent"
            className="h-full opacity-0 flex flex-col"
            ref={contentElement}
            {...dragBind()}
          >
            <FeedLogo id="headerMenu" hasWordmark />
            <div className="flex flex-col justify-center w-full h-full">
              <HeaderMenuLinks />
            </div>
          </div>
        </FullHeight>
        <div
          className={['fixed top-0 left-0 w-full h-full bg-grey-dark hidden z-[13]'].join(' ')}
          role="button"
          aria-label="Close navigation"
          onClick={() => toggle(false)}
          ref={backGroundElement}
        />
      </>
    </Transition>
  )
}

HeaderMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default HeaderMenu
