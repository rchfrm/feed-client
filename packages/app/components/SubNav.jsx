import React from 'react'
import { gsap, Power1, Power2 } from 'gsap'
import { Transition } from 'react-transition-group'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useSwipeDismiss from '@/hooks/useSwipeDismiss'
import FullHeight from '@/elements/FullHeight'
import CloseCircle from '@/icons/CloseCircle'
import SubNavArtists from '@/app/SubNavArtists'
import SubNavLinks from '@/app/SubNavLinks'
import SignOutLink from '@/app/SignOutLink'
import brandColors from '@/constants/brandColors'

const SubNav = ({ open, toggle, windowWidth }) => {
  const contentElement = React.useRef()
  const animationType = React.useRef('')
  const animationPromise = React.useRef()
  const isMobile = React.useRef(false)

  // Initial animation
  const setDisplay = (state, node) => {
    node.style.display = state ? 'block' : 'none'
  }

  // Panel animation
  const animateContainer = React.useCallback((state) => {
    const target = document.getElementById('SubNav')
    const { width: navWidth } = target.getBoundingClientRect()
    const scaleX = 1
    const xPercent = ! state ? -100 : 0
    const ease = Power2.easeOut
    const duration = state ? 0.4 : 0.3

    // Animate side navigation
    const SideNav = document.getElementById('SideNav')
    const xMove = state ? navWidth : 0
    gsap.to(SideNav, { x: xMove, duration, ease })

    // Fade in sub nav background
    const SubNavBackground = document.getElementById('SubNavBackground')
    const bgOpacity = state ? 0.8 : 0
    SubNavBackground.style.display = 'block'
    gsap.to(SubNavBackground, { opacity: bgOpacity, duration, ease })

    // Animate container
    return gsap.to(target, { scaleX, x: 0, y: 0, xPercent, duration, ease })
  }, [])

  // Background animation
  const animateContent = (state, delay = 0) => {
    const { current: target } = contentElement
    const opacity = state ? 1 : 0
    const duration = state ? 0.4 : 0

    return gsap.to(target, { opacity, y: 0, duration, delay, ease: Power1.easeOut })
  }

  // Reset elements after animation
  const resetElements = () => {
    const SubNav = document.getElementById('SubNav')
    if (! SubNav) {
      return
    }

    const SideNav = document.getElementById('SideNav')
    const SubNavBackground = document.getElementById('SubNavBackground')

    gsap.set(SubNav, { x: 0, scaleX: 1, scaleY: 1, xPercent: -100 })
    SubNavBackground.style.display = 'none'

    if (! SideNav) {
      return
    }
    gsap.set([SideNav], { x: 0 })
  }

  // Run all animations
  const toggleAnimation = async (state, node) => {
    // Show element before animating in
    if (state) {
      setDisplay(state, node)
    }

    const body = document.querySelector('body')
    const action = state ? 'add' : 'remove'
    body.classList[action]('nav-open')

    animationPromise.current = new Promise((resolve) => {
      // Define order
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

  // Handle window resize
  const onResize = () => {
    // Reset initial position of elements
    if (! open) {
      resetElements()
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onResize, [windowWidth])

  // Dragging
  const dragBind = useSwipeDismiss({
    movingTargetId: 'SubNav',
    touchTargetId: 'SubNav__contents',
    hide: () => toggle(false),
    reset: () => animateContainer(true),
    disableCondition: ! isMobile.current || animationType.current === 'desktop',
  })

  // Toggle body scroll
  React.useEffect(() => {
    // Disable for desktops
    if (! isMobile.current) {
      return
    }
    const scrollEl = document.getElementById('SubNav')
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
          id="SubNav"
          className={[
            'page--content',
            'fixed left-0 top-0 z-[14]',
            'w-4/5 md:w-auto pb-10 pt-30 md:pt-30 md:p-10',
            'bg-black text-grey-2 font-display hidden origin-left',
          ].join(' ')}
        >
          <button onClick={toggle}>
            <CloseCircle className="absolute top-20 -right-[22px] md:-right-[86px] w-12 h-12" fill={brandColors.textColor} />
          </button>
          <div
            id="SubNav__contents"
            className="h-full opacity-0"
            ref={contentElement}
            {...dragBind()}
          >
            <div className="flex flex-col justify-center md:justify-between w-full min-h-full">
              <SubNavLinks />
              <SubNavArtists />
            </div>
            <p className="mb-6 text-sm opacity-70 hover:opacity-100 block md:hidden">
              <SignOutLink />
            </p>
          </div>
        </FullHeight>
        <div
          id="SubNavBackground"
          className={['fixed top-0 left-0 w-full h-full bg-grey-3 hidden z-[13]'].join(' ')}
          role="button"
          aria-label="Close navigation"
          onClick={() => toggle(false)}
        />
      </>
    </Transition>
  )
}

export default SubNav
