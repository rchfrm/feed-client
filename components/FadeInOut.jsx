import React from 'react'

import { useTransition, animated } from 'react-spring'


const FadeInOut = (Component) => {
  return (componentProps) => {
    // Toggle when mounting and unmounting
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
      setShow(true)
      return () => {
        setShow(false)
      }
    }, [])

    // Define transition
    const springConfig = {
      mass: 5,
      tension: 500,
      friction: 30,
      clamp: true,
    }
    const transition = useTransition(show, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: springConfig,
    })

    // Output component
    return transition.map(({ item, key, props }) => item && (
      <animated.div
        key={key}
        style={props}
      >
        <Component {...componentProps} />
      </animated.div>
    ))
  }
}

export default FadeInOut
