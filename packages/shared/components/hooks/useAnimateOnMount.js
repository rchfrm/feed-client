import React from 'react'
import { gsap } from 'gsap'

const isUndefined = (arg) => arg === undefined
const isAnyDefined = (...args) => args.some((a) => !isUndefined(a))
const noop = () => { }
const debug = (name, msg) => console.debug(name, msg)

const defaultAnimationProps = {
  duration: 0.3,
  ease: 'power1.out',
  delay: 0,
}

// HELPERS
// -----------------

// GET PROP VALUE BASED ON DIRECTION
const getValueFromDirection = (values, direction) => {
  const [inValue, outValue] = values
  if (direction === 'in') return inValue
  return outValue
}

// RUN THE ANIMATION
const startAnimation = (el, animateFrom, animateTo, animProps) => {
  // Set intially
  gsap.set(el, animateFrom)
  // Animate
  const animation = gsap.to(el, { ...animateTo, ...animProps })
  return animation
}

// GET WHICH PROPS TO ANIMATE TO AND FROM
const getElProps = (animateToFrom, direction) => {
  return Object.entries(animateToFrom).reduce((props, [elPropKey, elPropValue]) => {
    const propValue = elPropValue[direction]
    props[elPropKey] = propValue
    return props
  }, {})
}

// GET THE ANIMATION OPTIONS
const getAnimationProps = (options, direction) => {
  return Object.entries(options).reduce((props, [propKey, propValue]) => {
    const value = Array.isArray(propValue) ? getValueFromDirection(propValue, direction) : propValue
    props[propKey] = value
    return props
  }, {})
}


const useAnimateOnMount = ({
  animateToFrom,
  animationOptions = {},
  initial,
  animateFirstRender = true,
  enter = noop,
  exit,
  wait,
  debugName = 'unknown',
}) => {
  const [variant, setVariant] = React.useState(initial)
  const didRender = React.useRef(false)
  const animationInstance = React.useRef()
  const domRef = React.useRef()
  const aboutToExit = React.useRef(false)
  const isVisible = variant === 'visible'

  if (isUndefined(animateToFrom)) {
    throw Error('You must provide animateTo for animation.')
  }
  if (isUndefined(initial)) {
    throw Error('You must provide initial value ("visible" or "hidden").')
  }
  if (wait && isAnyDefined(enter, exit)) {
    throw Error('You cannot use wait if enter or exit is defined.')
  }
  enter = wait || enter
  exit = wait || exit

  // ANIMATE
  const animate = ({ el, visible }) => {
    const direction = visible ? 'in' : 'out'
    const animateFrom = getElProps(animateToFrom, visible ? 'from' : 'to')
    const animateTo = getElProps(animateToFrom, visible ? 'to' : 'from')
    const animationPropsToParse = { ...defaultAnimationProps, ...animationOptions }
    const animationProps = getAnimationProps(animationPropsToParse, direction)
    return startAnimation(el, animateFrom, animateTo, animationProps)
  }

  const animateVisible = (el) => animate({
    el,
    visible: true,
  })

  const playEnterAnimation = () => {
    if (!domRef.current) return
    const animation = animateVisible(domRef.current)
    animationInstance.current = animation
    if (enter) {
      debug(debugName, 'Registering onfinish enter animation')
      animation.then(() => enter())
    }
  }
  const handleExitAnimationEnd = (exitCb) => {
    debug(debugName, 'Exit animation finished')
    setVariant('hidden')
    exitCb()
  }

  // HIDE
  const hidePresence = (exitCb = noop) => {
    if (variant === 'hidden') return
    const playExitAnimation = () => {
      const animation = animate({
        el: domRef.current,
        visible: false,
      })
      animationInstance.current = animation
      animation.then(() => {
        handleExitAnimationEnd(exitCb)
      })
    }
    playExitAnimation()
  }

  // SHOW
  const showPresence = () => {
    debug(debugName, 'Switching to visible')
    aboutToExit.current = false
    setVariant('visible')
  }

  // TOGGLE
  const togglePresence = (exitCb = noop) => {
    debug(debugName, `Toggled variant, currently ${variant}`)
    if (isVisible) {
      hidePresence(exitCb)
    } else {
      showPresence()
    }
  }

  React.useLayoutEffect(() => {
    if (!domRef.current) {
      debug(debugName, 'ref is now undefined!')
      return
    }
    const shouldAnimateFirstRender = !didRender.current && animateFirstRender
    if (shouldAnimateFirstRender) {
      debug(debugName, 'Animating first render')
      return playEnterAnimation()
    }
    if (isVisible) {
      debug(debugName, 'Playing enter animation')
      playEnterAnimation()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, debugName, animateFirstRender])

  React.useLayoutEffect(() => {
    if (!didRender.current && isVisible) {
      debug(debugName, 'Rendered')
      didRender.current = true
    }
  }, [isVisible, debugName])

  // EXPORT
  return {
    ref: domRef,
    isRendered: isVisible,
    hidePresence,
    showPresence,
    togglePresence,
  }
}

export default useAnimateOnMount
