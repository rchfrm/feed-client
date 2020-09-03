import React from 'react'
import { gsap } from 'gsap'

const isUndefined = (arg) => arg === undefined
const isAnyDefined = (...args) => args.some((a) => !isUndefined(a))

const startAnimation = (el, animateFrom, animateTo, animProps) => {
  gsap.set(el, animateFrom)
  const animation = gsap.to(el, { ...animateTo, ...animProps })
  return animation
}

const noop = () => { }
const debug = (name, msg) => console.debug(name, msg)

const getElProps = (animateToFrom, direction) => {
  return Object.entries(animateToFrom).reduce((props, [elPropKey, elPropValue]) => {
    const propValue = elPropValue[direction]
    props[elPropKey] = propValue
    return props
  }, {})
}

const useAnimateOnMount = ({
  animateToFrom,
  initial,
  animateFirstRender = true,
  options = {},
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
  const { duration = 0.3, ease = 'power1.out', delay = 0 } = options
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
  const animate = ({ el, visible }) => {
    const animateFrom = getElProps(animateToFrom, visible ? 'from' : 'to')
    const animateTo = getElProps(animateToFrom, visible ? 'to' : 'from')
    return startAnimation(el, animateFrom, animateTo, { duration, ease, delay })
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
  const togglePresence = (exitCb = noop) => {
    debug(debugName, `Toggled variant, currently ${variant}`)
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
    if (isVisible) {
      playExitAnimation()
    } else {
      debug(debugName, 'Switching to visible')
      aboutToExit.current = false
      setVariant('visible')
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
  return { ref: domRef, isRendered: isVisible, togglePresence }
}

export default useAnimateOnMount
