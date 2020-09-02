import React from 'react'

const isUndefined = (arg) => arg === undefined
const isAnyDefined = (...args) => args.some((a) => !isUndefined(a))
const isRunning = (anim) => anim && anim.playState === 'running'


const startAnimation = (el, keyframes, duration) => {
  const keyframeEffect = new KeyframeEffect(el, keyframes, {
    duration,
    fill: 'both',
    easing: 'linear',
    iterations: 1,
  })
  const animation = new Animation(keyframeEffect)
  animation.play()
  return animation
}

const noop = () => { }
const debug = (name, msg) => console.debug(name, msg)
const defaultDiff = { from: 0, to: 0 }
const defaultOpacity = { from: 1, to: 1 }
const defaultScale = 1

const useAnimateOnMount = ({
  variants,
  duration,
  initial,
  animateFirstRender = true,
  options = {},
  enter,
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
  const { stiffness = 150, mass = 3, damping = 27 } = options
  if (isUndefined(variants)) {
    throw Error('You must provide variants for animation.')
  }
  if (isUndefined(initial)) {
    throw Error('You must provide initial value ("visible" or "hidden").')
  }
  if (wait && isAnyDefined(enter, exit)) {
    throw Error('You cannot use wait if enter or exit is defined.')
  }
  const { x = defaultDiff, y = defaultDiff, scale = defaultScale, opacity = defaultOpacity, deg = 0 } = variants
  enter = wait || enter
  exit = wait || exit
  const animateSpring = ({ el, visible, duration = 1000 }) => {
    const { keyframes, frames } = createSpringAnimation({
      dx: x.from - x.to,
      dy: y.from - y.to,
      stiffness,
      mass,
      damping,
      scale,
      deg,
      reverse: !visible,
    })
    const noMove = keyframes.length === 0
    if (noMove) {
      keyframes.push({}, {})
    }
    keyframes[0].opacity = visible ? opacity.from : opacity.to
    keyframes[keyframes.length - 1].opacity = visible
      ? opacity.to
      : opacity.from
    console.log(keyframes)
    return startAnimation(el, keyframes, noMove ? duration : (frames / 60) * 1000)
  }
  const animateVisible = (el) => animateSpring({
    el,
    duration,
    visible: true,
  })
  const playEnterAnimation = () => {
    if (!domRef.current) return
    const animation = animateVisible(domRef.current)
    animationInstance.current = animation
    if (enter) {
      debug(debugName, 'Registering onfinish enter animation')
      animation.onfinish = () => enter()
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
      const animation = animateSpring({
        el: domRef.current,
        duration,
        visible: false,
      })
      animationInstance.current = animation
      animation.onfinish = () => {
        handleExitAnimationEnd(exitCb)
      }
    }
    if (isRunning(animationInstance.current)) {
      animationInstance.current.playbackRate *= -1
      if (!aboutToExit.current) {
        debug(debugName, 'Reverting enter animation')
        aboutToExit.current = true
        animationInstance.current.onfinish = () => handleExitAnimationEnd(exitCb)
      } else {
        debug(debugName, 'Reverting exit animation')
        const onFinish = () => {
          enter ? enter() : noop()
        }
        animationInstance.current.onfinish = onFinish
        aboutToExit.current = false
      }
      return
    }
    if (isVisible) {
      if (exit) {
        aboutToExit.current = true
        debug(debugName, 'Delaying exit animation')
        exit(playExitAnimation)
      } else {
        debug(debugName, 'Starting exit animation')
        aboutToExit.current = true
        playExitAnimation()
      }
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
  }, [isVisible, debugName, animateFirstRender])
  React.useLayoutEffect(() => {
    if (!didRender.current && isVisible) {
      debug(debugName, 'Rendered')
      didRender.current = true
    }
  }, [isVisible])
  return { ref: domRef, isRendered: isVisible, togglePresence }
}

export default useAnimateOnMount
