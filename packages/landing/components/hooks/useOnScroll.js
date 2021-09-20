import React from 'react'
import debounce from 'lodash/debounce'

const useOnScroll = ({
  throttle = 100,
  getDelta = false,
  getDirection = false,
}) => {
  const isClient = typeof window === 'object'

  const props = React.useRef({
    lastScrollDelta: null,
    lastScrollDirection: null,
    newScroll: 0,
    delta: 0,
    timer: null,
  })

  // Prevent mobile negative scrolling
  const sanitiseScroll = (scrollTop) => {
    return Math.max(0, scrollTop)
  }

  const clear = () => {
    props.current.lastScroll = null
    props.current.delta = 0
  }

  const calcDelta = React.useCallback((scrollTop) => {
    props.current.newScroll = scrollTop
    if (props.current.lastScrollDelta !== null) {
      props.current.delta = props.current.newScroll - props.current.lastScrollDelta
    }
    props.current.lastScrollDelta = sanitiseScroll(props.current.newScroll)
    clearTimeout(props.current.timer)
    props.current.timer = setTimeout(clear, throttle / 2)
    return props.current.delta
  }, [throttle])

  const calcDirection = React.useCallback((scrollTop) => {
    if (scrollTop > props.current.lastScrollDirection) {
      props.current.lastScrollDirection = sanitiseScroll(scrollTop)
      return 'down'
    }
    props.current.lastScrollDirection = sanitiseScroll(scrollTop)
    return 'up'
  }, [])

  const getScrollProps = React.useCallback(() => {
    const scrollTop = isClient ? sanitiseScroll(window.scrollY) : undefined
    return {
      scrollTop,
      scrollLeft: isClient ? window.scrollX : undefined,
      delta: getDelta && isClient ? calcDelta(scrollTop) : undefined,
      direction: getDirection && isClient ? calcDirection(scrollTop) : undefined,
    }
  }, [calcDelta, calcDirection, getDelta, getDirection, isClient])

  const [scrollProps, setScrollProps] = React.useState(getScrollProps())
  React.useEffect(() => {
    const scrollProps = getScrollProps()
    // Set scroll props
    setScrollProps(scrollProps)
    // Setup listener
    const debouncedCallback = debounce(() => {
      const scrollProps = getScrollProps()
      setScrollProps(scrollProps)
    }, throttle)
    window.addEventListener('scroll', debouncedCallback, { passive: true })
    // Remove listener
    return () => {
      window.removeEventListener('scroll', debouncedCallback, { passive: true })
      debouncedCallback.cancel()
    }
  }, [getScrollProps, throttle])

  return scrollProps
}

export default useOnScroll
