import React from 'react'
import { gsap, Power1 } from 'gsap'
import { Transition } from 'react-transition-group'


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

    // Define animation
    const animationInstance = React.useRef(null)
    const toggleAnimation = (state, target) => {
      const opacity = state ? 1 : 0
      const duration = state ? 0.3 : 0.5
      animationInstance.current = gsap.to(target, { opacity, duration, ease: Power1.easeOut })
    }
    const onAnimationFinished = async (done) => {
      await animationInstance.current.then()
      done()
    }

    return (
      <Transition
        in={show}
        onEnter={(target) => toggleAnimation(true, target)}
        onExit={(target) => toggleAnimation(false, target)}
        addEndListener={(node, done) => {
          onAnimationFinished(done)
        }}
        appear
        unmountOnExit
      >
        <Component {...componentProps} />
      </Transition>
    )
  }
}

export default FadeInOut
